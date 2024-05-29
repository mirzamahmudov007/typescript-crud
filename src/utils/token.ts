import { CallbackResponse } from '@/http/modules/login/index.d'

const USER_INFO = '@geosmartUserInfo'

export const setUserInfo = (data: CallbackResponse) => localStorage.setItem(USER_INFO, JSON.stringify(data))

export const getUserInfo = (): CallbackResponse | undefined => {
  const info = localStorage.getItem(USER_INFO)
  return info ? JSON.parse(info) : undefined
}

export const clearUserInfo = () => localStorage.removeItem(USER_INFO)

export const getTokenAccess = () => getUserInfo()?.access_token
