import { get, post, put } from '@/http/request'

type PermissionParamType = {
  limit: number
  page: number
  full_name?: string | null
}

export type PermissionFormDataType = {
  name: string
  description: string
  code: string
  status: boolean
}

type PermissionsDataType = {
  count: number
  permissionsList: any
}

export const getPermissions = (params: PermissionParamType) => get<PermissionsDataType>('/settings/permissions', params)
export const getPermission = (id: String) => get<PermissionFormDataType>(`/settings/permissions/${id}`)
export const postPermission = (data: PermissionFormDataType) => post('/settings/permissions', data)
export const putPermission = (id: String, data: PermissionFormDataType) => put(`/settings/permissions/${id}`, data)
