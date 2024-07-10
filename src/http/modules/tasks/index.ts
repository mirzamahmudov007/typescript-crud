import { put, get, post } from '@/http/request'

export type TaskType = {
  id: 1
  title: 'asdf'
  description: ''
  importance: 'LOW'
  uniqueNumber: 'sdfg-1'
  type: 'BUG'
  status: 'CREATED'
  createdAt: '7/9/2024, 2:48:47 PM'
  updatedAt: '7/9/2024, 2:48:47 PM'
  assigner: any
  project: any
  mainStaff: any
}

export type TasksType = {
  count: number
  tasksList: TaskType[]
}

export const createTask = (data: any) => post('/tasks', data)
export const getTasks = () => get<TasksType>('/tasks')
