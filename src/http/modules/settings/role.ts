import { get, post, put } from '@/http/request'

type RoleParamType = {
  limit: number
  page: number
  full_name?: string | null
}

export type RoleFormDataType = {
  organization_id: number
  soato: string
  permissions: number[]
}

export interface RoleDataType extends RoleFormDataType {
  id: number
}

type RolesDataType = {
  count: number
  rolesList: any
}

export const getRoles = (params: RoleParamType) => get<RolesDataType>('/settings/roles', params)
export const getRole = (id: number) => get<RoleFormDataType>(`/settings/roles/${id}`)
export const patchRole = (id: number, data: RoleFormDataType) => put(`/settings/roles/${id}/permissions`, data)
export const getRolePermission = (id: number) => get(`/settings/roles/${id}/permissions`)
