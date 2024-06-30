import { get, post, put } from '@/http/request'

type ProjectParamType = {
  limit: number
  page: number
  full_name?: string | null
}

export type ProjectFormDataType = {
  id: string
  title: string
  description: string
  image: string
  abbreviation: string
  status: boolean
}

type ProjectsDataType = {
  count: number
  projectsList: ProjectFormDataType[]
}

export const getProjects = () => get<ProjectsDataType>('/projects')
export const getProject = (id: String) => get<ProjectFormDataType>(`/projects/${id}`)
export const postProject = (data: ProjectFormDataType) => post('/projects', data)
export const putProject = (id: String, data: ProjectFormDataType) => put(`/projects/${id}`, data)
