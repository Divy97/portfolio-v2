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

async function getAccessToken(): Promise<string> {
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
  if (!res.ok) throw new Error(`token refresh failed: ${res.status}`)
  const data = await res.json()
  return data.access_token as string
}

export async function GET() {
  const noStore = { 'Cache-Control': 'no-store' }

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return Response.json({ configured: false }, { headers: noStore })
  }

  try {
    const accessToken = await getAccessToken()
    const auth = { Authorization: `Bearer ${accessToken}` }

    // Now playing
    let nowPlaying: ReturnType<typeof mapTrack> & { isPlaying: boolean } | null = null
    const npRes = await fetch(NOW_PLAYING_URL, { headers: auth, cache: 'no-store' })
    if (npRes.status === 200) {
      const d = await npRes.json()
      if (d?.item) nowPlaying = { ...mapTrack(d.item), isPlaying: Boolean(d.is_playing) }
    }

    // Recently played (fallback when nothing is on)
    let recent: ReturnType<typeof mapTrack> | null = null
    if (!nowPlaying) {
      const rRes = await fetch(RECENT_URL, { headers: auth, cache: 'no-store' })
      if (rRes.ok) {
        const d = await rRes.json()
        if (d?.items?.[0]?.track) recent = mapTrack(d.items[0].track)
      }
    }

    // Top tracks, last ~4 weeks
    let top: ReturnType<typeof mapTrack>[] = []
    const tRes = await fetch(TOP_URL, { headers: auth, cache: 'no-store' })
    if (tRes.ok) {
      const d = await tRes.json()
      top = (d.items ?? []).map(mapTrack)
    }

    return Response.json({ configured: true, nowPlaying, recent, top }, { headers: noStore })
  } catch {
    // Don't break the page if Spotify is unreachable — fall back to curated data.
    return Response.json({ configured: false, error: true }, { headers: noStore })
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
