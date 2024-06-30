import { get, post } from '@/http/request'
import { CallbackResponse } from './index.d'

export const loginOneId = () => window.location.replace(`${import.meta.env.VITE_BACKEND_URI}/api/v1/auth/oneid/login`)
export const getLoginCallBack = (code: string | null) => get<CallbackResponse>(`/auth/oneid/callback`, { code })

export const fileUpload = (file: File | null) => post('/file', { file })
