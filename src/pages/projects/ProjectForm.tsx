import React from 'react'
import { Form, Upload, Input, Space, Button, Switch } from 'antd'
import UploadImage from '@/components/form/UploadImage'
import { PlusOutlined } from '@ant-design/icons'

function ProjectForm() {
  const [form] = Form.useForm()

  const onSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <Form
      layout="horizontal"
      form={form}
      className="mt-6"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      initialValues={{}}
      onFinish={onSubmit}
      // initialValues={initialValues}
      autoComplete="off"
    >
      <Form.Item label="Holati">
        <Switch />
      </Form.Item>
      <Form.Item label="Nomi">
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item label="Qisqacha ma'lumot">
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item label="Upload" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture">
          <button type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <UploadImage />
      </Form.Item>
      <Space className="d-flex my-2 justify-end w-full">
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Space>
    </Form>
  )
}

export default ProjectForm
