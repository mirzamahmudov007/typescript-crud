import { CallbackResponse } from '@/http/modules/login/index.d'
const USER_INFO = '@yeraksiyaUserInfo'

export const setAuth = (data: CallbackResponse) => localStorage.setItem(USER_INFO, JSON.stringify(data))
export const getAuth = () => {
  const info = localStorage.getItem(USER_INFO)
  return info ? JSON.parse(info) : ''
}
export const clearAuth = () => localStorage.removeItem(USER_INFO)
export const getTokenAccess = () => getAuth().access_token
