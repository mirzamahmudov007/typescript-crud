type ChangeProp = {
  pagination: {
    current: number
    pageSize: number
    total: number
  }
}

export const getParams = (params: ChangeProp) => {
  return {
    limit: params.pagination.pageSize,
    page: params.pagination.current
  }
}
