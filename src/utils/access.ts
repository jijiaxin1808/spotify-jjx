export function setAccessToken (token: string) {
  if (!token) return
  localStorage.setItem('spotify_access_token', token)
}
export function getAccessToken () {
  return localStorage.getItem('spotify_access_token')
}

export function hasAccessToken () {
  return !!localStorage.getItem('spotify_access_token')
}
