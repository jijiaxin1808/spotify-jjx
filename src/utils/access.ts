export function setAccessToken (token: string) {
  if (!token) return
  localStorage.setItem('spotify_access_token', token)
}
export function getAccessToken () {
  return localStorage.getItem('spotify_access_token')
}

export function hasAccessToken () {
  return localStorage.getItem('spotify_access_token')
}

export function setMeInfo (info: any) {
  localStorage.setItem('spotify_me_info', JSON.stringify(info))
}

export function getMeinfo () {
  return JSON.parse(localStorage.getItem('spotify_me_info') as string)
}
