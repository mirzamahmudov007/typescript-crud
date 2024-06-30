import React, { useEffect } from 'react'
import { Form, Upload, Input, Space, Button, Switch } from 'antd'
import UploadImage from '@/components/form/UploadImage'
import { PlusOutlined } from '@ant-design/icons'
import { postProject, putProject } from '@/http/modules/projects'

type PropsProjectFormType = {
  closeProjectModal: Function
  initialValues: any
  fetchProject: Function
}

function ProjectForm({ closeProjectModal, initialValues, fetchProject }: PropsProjectFormType) {
  const [form] = Form.useForm()

  const onSubmit = (e: any) => {
    if (Object.keys(initialValues).length) {
      putProject(initialValues.id, { ...e, image: form.getFieldValue('image') }).then(() => {
        form.resetFields()
        closeProjectModal(false)
        fetchProject()
      })
    } else
      postProject({ ...e, image: form.getFieldValue('image') }).then(() => {
        form.resetFields()
        closeProjectModal(false)
        fetchProject()
      })
  }
  useEffect(() => {
    if (Object.keys(initialValues).length) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues])

  return (
    <Form
      layout="horizontal"
      form={form}
      className="mt-6"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      onFinish={onSubmit}
      initialValues={initialValues}
      autoComplete="off"
    >
      <Form.Item label="Holati" name="status">
        <Switch />
      </Form.Item>
      <Form.Item label="Nomi" name="title">
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item label="Qisqartma" name="abbreviation">
        <Input placeholder="Qisqartma" />
      </Form.Item>
      <Form.Item label="Qisqacha ma'lumot" name="description">
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <UploadImage name="image" form={form} />
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
