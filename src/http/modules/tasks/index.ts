import { put, get, post } from '@/http/request'

const createTask = (data: any) => post('/task', data)
