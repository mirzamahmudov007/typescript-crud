import { useState, useEffect } from 'react'
import { Select } from 'antd'
import { get } from '@/http/request'

const initialOptions = [{ lebal: '', value: '' }]

function FAutoComplate({ url = '/settings/regions', params = {}, formatOptions = (e: any) => e, ...props }) {
  const [options, setOptions] = useState(initialOptions)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()
    getOptions()
    setOptions(initialOptions)
    return () => abortController.abort()
  }, [JSON.stringify(params)])

  const getOptions = () => {
    setLoading(true)

    !props?.disabled
      ? get(url, params)
          .then((res: any) => setOptions(formatOptions(res)))
          .finally(() => setLoading(false))
      : setLoading(false)
  }

  return (
    <Select
      showSearch
      loading={loading}
      filterOption={(input: string, option: any) => option.label.toLowerCase().includes(input.toLowerCase())}
      options={options}
      {...props}
    />
  )
}

export default FAutoComplate
