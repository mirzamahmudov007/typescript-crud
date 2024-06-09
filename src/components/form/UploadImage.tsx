import React from 'react'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'

const { Dragger } = Upload

const props: UploadProps = {
  name: 'image',
  multiple: false,
  action: '',
  headers: {
    authorization: 'authorization-text'
  },
  beforeUpload: (file) => {
    const isPNG = file.type === 'image/png'
    if (!isPNG) {
      message.error(`${file.name} is not a png file`)
    }
    return isPNG || Upload.LIST_IGNORE
  },
  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  }
}

const UploadImage: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Yuklash uchun faylni ushbu hududga bosing yoki sudrab torting</p>
    <p className="ant-upload-hint">
      Yagona qo'llab-quvvatlash. Kompaniya ma'lumotlarini yoki boshqa taqiqlangan fayllarni yuklash qat'iyan man
      etiladi.
    </p>
  </Dragger>
)

export default UploadImage
