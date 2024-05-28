import { get } from '@/http/request'
import { UserGetMeType } from './index.d'

export const getUserMe = () => get<UserGetMeType>('/users/me')
