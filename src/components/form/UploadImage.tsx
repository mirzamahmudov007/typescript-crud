import React, { useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Spin, Upload } from 'antd'
import { getTokenAccess } from '@/utils/token'

const { Dragger } = Upload

type PropsType = {
  form: any
  name: string
}

const UploadImage = (props: PropsType) => {
  const { form, name } = props

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState('')

  const propsData: UploadProps = {
    multiple: false,
    action: `${import.meta.env.VITE_BACKEND_URI}/api/v1/file`,
    headers: {
      authorization: `Bearer ${getTokenAccess()}`
    },
    showUploadList: false,
    beforeUpload: () => {},
    onChange(info) {
      const { file } = info
      const { status } = file

      if (status === 'uploading') {
        setIsLoading(true)
      }
      if (status === 'done') {
        setIsLoading(false)
        setData(file.response.file_url)
        form.setFieldValue(name, file.response.file_url)
      } else if (status === 'error') {
        setIsLoading(false)
        message.error(file.response.message)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <Dragger {...propsData}>
      {isLoading ? (
        <Spin />
      ) : !data ? (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Yuklash uchun faylni ushbu hududga bosing yoki sudrab torting</p>
          <p className="ant-upload-hint">
            Yagona qo'llab-quvvatlash. Kompaniya ma'lumotlarini yoki boshqa taqiqlangan fayllarni yuklash qat'iyan man
            etiladi.
          </p>
        </>
      ) : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p>Qo'shildi</p>
        </>
      )}
    </Dragger>
  )
}

export default UploadImage
