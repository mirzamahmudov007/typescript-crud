import { get } from '@/http/request'

export interface PositionFormDataType {
  name: string
  code: string
  description: string
  status: boolean
}

export interface PositionDataType extends PositionFormDataType {
  id: number
}

type PositionsDataType = {
  count: number
  positionsList: any
}

export const getPositions = () => get<PositionsDataType>('/settings/positions')
export const getPosition = (id: number) => get(`/settings/positions/${id}`)
