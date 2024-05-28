import { get } from '@/http/request'

type RegionType = {
  _id: string
  ru_name: string
  name: string
  soato: number
  code: string
}

type GetRegionsType = {
  success: boolean
  regions: RegionType[]
}

type DistrictType = {
  _id: string
  region_id: string
  ru_name: string
  name: string
  soato: number
  code: string
}

type GetDistrictsType = {
  success: boolean
  districts: DistrictType[]
}

type RegionsDataType = {}

export const getRegions = () => get<GetRegionsType>('/settings/regions')
export const getDistricts = (region_id: string) => get<GetDistrictsType>(`/settings/districts`, { region_id })
