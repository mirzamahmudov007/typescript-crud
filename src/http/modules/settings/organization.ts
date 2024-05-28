import { get } from '@/http/request'

export const getOrganizations = () => get('/settings/organizations')
