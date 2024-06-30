import Ckeditor from '@/components/ckeditor/Ckeditor'
import FAutoComplate from '@/components/form/FAutoComplate'
import { Form, Select, Input, Space, Button } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {}

function ModalContent() {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({}),
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      // resetForm()
    }
  })

  return (
    <Form
      layout="vertical"
      className="mt-6"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      autoComplete="off"
    >
      <div className="flex gap-4">
        <Form.Item className="w-full" label="Raqami">
          <Input value="NM-05" disabled={true} />
        </Form.Item>
        <Form.Item className="w-full" label="Topshiriq beruvchi" name="name">
          <FAutoComplate
            placeholder="Users"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('user', user)}
            // value={v.region}
            formatOptions={(e) => e.regions.map((i: any) => ({ label: i.name, value: i._id }))}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Muhumligi" name="code">
          <Select
            onChange={formik.handleChange}
            options={[
              { value: 'easy', label: 'Oddiy' },
              { value: 'middle', label: "O'rta" },
              { value: 'ex', label: 'Muhum' },
              { value: 'exx', label: "O'ta muhum" }
            ]}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Turi" name="code">
          <Select
            onChange={formik.handleChange}
            options={[
              { value: 'bug', label: 'Xato' },
              { value: 'middle', label: "Qo'shimcha" },
              { value: 'feature', label: 'Yangi' }
            ]}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Topshiriq mazmuni">
          <Input value="" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item className="w-full" label="Loyiha" name="code">
          <FAutoComplate
            placeholder="Loyihalar"
            url="/projects"
            onChange={(p: string) => formik.setFieldValue('user', p)}
            // value={v.region}
            formatOptions={(e) => e.regions.map((i: any) => ({ label: i.name, value: i._id }))}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Asosiy ijrochi" name="code">
          <FAutoComplate
            placeholder="Asosiy ijrochi"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('user', user)}
            // value={v.region}
            formatOptions={(e) => e.regions.map((i: any) => ({ label: i.name, value: i._id }))}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Yordamchi ijrochi" name="code">
          <FAutoComplate
            placeholder="Yordamchi ijrochilar"
            url="/users"
            onChange={(user: string) => formik.setFieldValue('user', user)}
            // value={v.region}
            formatOptions={(e) => e.regions.map((i: any) => ({ label: i.name, value: i._id }))}
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
