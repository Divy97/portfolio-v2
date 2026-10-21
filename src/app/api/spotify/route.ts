// Server-side Spotify proxy. Keeps client secret + refresh token off the client.
// Returns live "now playing" (falling back to recently played) plus top tracks
// for the last ~4 weeks. Falls back to { configured: false } when env vars are
// missing so the site keeps working before the one-time auth is done.

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'
const TOP_URL = 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=8'

interface SpotifyArtist { name: string }
interface SpotifyImage { url: string; width: number; height: number }
interface SpotifyTrackItem {
  name: string
  artists: SpotifyArtist[]
  album?: { name?: string; images?: SpotifyImage[] }
  external_urls?: { spotify?: string }
}

function mapTrack(item: SpotifyTrackItem) {
  const images = item.album?.images ?? []
  // smallest image that's still reasonable (last is usually 64px)
  const albumImageUrl = images[images.length - 1]?.url ?? images[0]?.url
  return {
    title: item.name,
    artist: item.artists.map(a => a.name).join(', '),
    album: item.album?.name,
    albumImageUrl,
    songUrl: item.external_urls?.spotify,
  }
}

type Track = ReturnType<typeof mapTrack>
type Payload = { configured: true; nowPlaying: (Track & { isPlaying: boolean }) | null; recent: Track | null; top: Track[] }

// Spotify rate-limits this app hard (dev-mode quota), and every open tab polls
// every 30s. So: reuse the access token until it expires, answer repeat
// requests from memory for NOW_TTL, refresh top tracks hourly, and skip an
// endpoint while its 429 Retry-After window is open. Spotify limits endpoints
// separately (now-playing can work while top tracks is blocked for hours), so
// the backoff is per URL. The CDN header shares one answer across visitors.
const NOW_TTL = 30_000
const TOP_TTL = 60 * 60_000

let token: { value: string; expiresAt: number } | null = null
let top: { tracks: Track[]; at: number } | null = null
let last: { payload: Payload; at: number } | null = null
const blockedUntil = new Map<string, number>()
let inflight: Promise<Payload> | null = null

class RateLimited extends Error {}

const isBlocked = (url: string) => Date.now() < (blockedUntil.get(url) ?? 0)

function noteRateLimit(url: string, res: Response) {
  const retry = Number(res.headers.get('retry-after'))
  blockedUntil.set(url, Date.now() + (Number.isFinite(retry) && retry > 0 ? retry : 60) * 1000)
}

async function getAccessToken(): Promise<string> {
  if (token && Date.now() < token.expiresAt) return token.value
  if (isBlocked(TOKEN_URL)) throw new RateLimited()
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN as string,
    }),
    cache: 'no-store',
  })
  if (res.status === 429) { noteRateLimit(TOKEN_URL, res); throw new RateLimited() }
  if (!res.ok) throw new Error(`token refresh failed: ${res.status}`)
  const data = await res.json()
  // Spotify tokens last an hour; refresh a minute early.
  token = { value: data.access_token as string, expiresAt: Date.now() + ((data.expires_in ?? 3600) - 60) * 1000 }
  return token.value
}

// null = no content (204), rate-limited, or another non-fatal error.
async function spotifyGet<T>(url: string, accessToken: string): Promise<T | null> {
  if (isBlocked(url)) return null
  const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` }, cache: 'no-store' })
  if (res.status === 429) { noteRateLimit(url, res); return null }
  if (res.status === 401) token = null
  if (res.status !== 200) return null
  return res.json() as Promise<T>
}

type PlayingResponse = { item?: SpotifyTrackItem; is_playing?: boolean }
type RecentResponse = { items?: { track?: SpotifyTrackItem }[] }
type TopResponse = { items?: SpotifyTrackItem[] }

async function load(): Promise<Payload> {
  // Anything we fail to fetch this round falls back to the last good answer.
  const payload: Payload = {
    configured: true,
    nowPlaying: null,
    // The track playing last round is more recent than the last "recently played".
    recent: last?.payload.nowPlaying ?? last?.payload.recent ?? null,
    top: top?.tracks ?? [],
  }
  try {
    const accessToken = await getAccessToken()

    const np = await spotifyGet<PlayingResponse>(NOW_PLAYING_URL, accessToken)
    if (np?.item) payload.nowPlaying = { ...mapTrack(np.item), isPlaying: Boolean(np.is_playing) }

    // Recently played (fallback when nothing is on)
    if (!payload.nowPlaying) {
      const r = await spotifyGet<RecentResponse>(RECENT_URL, accessToken)
      const track = r?.items?.[0]?.track
      if (track) payload.recent = mapTrack(track)
    }

    // Top tracks, last ~4 weeks
    if (!top || Date.now() - top.at > TOP_TTL) {
      const t = await spotifyGet<TopResponse>(TOP_URL, accessToken)
      if (t?.items) {
        top = { tracks: t.items.map(mapTrack), at: Date.now() }
        payload.top = top.tracks
      }
    }
  } catch (err) {
    if (!(err instanceof RateLimited) && !last) throw err
  }

  last = { payload, at: Date.now() }
  return payload
}

export async function GET() {
  const noStore = { 'Cache-Control': 'no-store' }

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({ configured: false }, { headers: noStore })
  }

  try {
    let payload: Payload
    if (last && Date.now() - last.at < NOW_TTL) {
      payload = last.payload
    } else {
      inflight ??= load().finally(() => { inflight = null })
      payload = await inflight
    }
    return Response.json(payload, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=30' },
    })
  } catch {
    // Don't break the page if Spotify is unreachable — fall back to curated data.
    return Response.json({ configured: false, error: true }, { headers: noStore })
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
