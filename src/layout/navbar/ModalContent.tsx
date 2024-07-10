import Ckeditor from '@/components/ckeditor/Ckeditor'
import FAutoComplate from '@/components/form/FAutoComplate'
import { createTask } from '@/http'
import { Form, Select, Input, Space, Button } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  title: '',
  description: '',
  importance: 'LOW',
  project_id: '',
  type: 'BUG',
  main_user: '',
  assistants: [],
  assigner: ''
}

function ModalContent() {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({}),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      createTask(values).then(() => {
        resetForm()
      })
      // resetForm()
    }
  })

  const v = formik.values

  return (
    <Form
      layout="vertical"
      className="mt-6"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      autoComplete="off"
      onFinish={formik.submitForm}
    >
      <div className="flex gap-4">
        <Form.Item className="w-full" label="Raqami">
          <Input value="NM-05" disabled={true} />
        </Form.Item>
        <Form.Item className="w-full" label="Topshiriq beruvchi" name="assigner">
          <FAutoComplate
            placeholder="Users"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('assigner', user)}
            value={v.assigner}
            formatOptions={(e) => e.usersList.map((i: any) => ({ label: i.fullName, value: i.id }))}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Muhumligi" name="importance">
          <Select
            placeholder="Muhumligi"
            onChange={(e) => formik.setFieldValue('importance', e)}
            options={[
              { value: 'LOW', label: 'Oddiy' },
              { value: 'MEDIUM', label: "O'rta" },
              { value: 'HIGH', label: 'Muhum' },
              { value: 'VERY_HIGH', label: "O'ta muhum" }
            ]}
            value={v.importance}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Turi" name="type">
          <Select
            placeholder="Turi"
            onChange={formik.handleChange}
            options={[
              { value: 'BUG', label: 'Xato' },
              { value: 'CHANGE', label: "Qo'shimcha" },
              { value: 'FEATURE', label: 'Yangi' }
            ]}
            value={v.type}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Topshiriq mazmuni">
          <Input name="title" value={v.title} onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item className="w-full" label="Loyiha" name="project_id">
          <FAutoComplate
            placeholder="Loyihalar"
            url="/projects"
            onChange={(p: string) => formik.setFieldValue('project_id', p)}
            value={v.project_id}
            formatOptions={(e) => e.projectsList.map((i: any) => ({ label: i.title, value: i.id }))}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Asosiy ijrochi" name="main_user">
          <FAutoComplate
            placeholder="Users"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('main_user', user)}
            value={v.main_user}
            formatOptions={(e) => e.usersList.map((i: any) => ({ label: i.fullName, value: i.id }))}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Yordamchi ijrochi" name="assistants">
          <FAutoComplate
            placeholder="Yordamchi ijrochilar"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('assistants', user)}
            value={v.assistants}
            formatOptions={(e) => e.usersList.map((i: any) => ({ label: i.fullName, value: i._id }))}
            mode="multiple"
          />
        </Form.Item>
      </div>
      <div>
        <Ckeditor name="main" onChange={formik.handleChange} />
      </div>
      <Space className="d-flex my-2 justify-end w-full">
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Space>
    </Form>
  )
}

export default ModalContent
