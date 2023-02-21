import { User } from 'src/types/user.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem('refresh_token', refreshToken)
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')

  const clearLocalStorageEvent = new Event('clearLocalStorage')
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const setProfileToLocalStorage = (user: User) => {
  localStorage.setItem('profile', JSON.stringify(user))
}
