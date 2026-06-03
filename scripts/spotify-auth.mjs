// One-time helper to fetch your Spotify refresh token.
//
// Prerequisites:
//   1. Create an app at https://developer.spotify.com/dashboard
//   2. In the app settings, add this exact Redirect URI:
//        http://127.0.0.1:8888/callback
//   3. Copy the Client ID and Client Secret.
//
// Run:
//   SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
//
// Then open the printed URL, approve, and copy the refresh token from your
// terminal into your env as SPOTIFY_REFRESH_TOKEN.

import http from 'node:http'
import { randomBytes } from 'node:crypto'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const PORT = 8888
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`
const SCOPES = 'user-read-currently-playing user-read-recently-played user-top-read'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n✗ Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET as env vars first.\n')
  process.exit(1)
}

const state = randomBytes(8).toString('hex')
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
    state,
  }).toString()

console.log('\n1) Open this URL in your browser and approve access:\n')
console.log(authUrl + '\n')

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI)
  if (!url.pathname.startsWith('/callback')) {
    res.writeHead(404)
    res.end()
    return
  }

  const code = url.searchParams.get('code')
  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html' })
    res.end('<h2>Missing ?code in callback.</h2>')
    return
  }

  try {
    const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    })
    const data = await tokenRes.json()

    if (data.refresh_token) {
      console.log('\n✅ Success! Add this as SPOTIFY_REFRESH_TOKEN:\n')
      console.log(data.refresh_token + '\n')
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end('<h2>Done — check your terminal for the refresh token. You can close this tab.</h2>')
    } else {
      console.error('\n✗ No refresh_token in response:\n', data, '\n')
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end('<h2>Failed — see terminal.</h2>')
    }
  } catch (err) {
    console.error('\n✗ Token exchange error:\n', err, '\n')
    res.writeHead(500, { 'Content-Type': 'text/html' })
    res.end('<h2>Error — see terminal.</h2>')
  } finally {
    setTimeout(() => server.close(() => process.exit(0)), 600)
  }
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`2) Waiting for the Spotify redirect on ${REDIRECT_URI} ...\n`)
})
