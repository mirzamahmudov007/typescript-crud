import { Form, Space, Button, Select } from 'antd'

function ProjectUserForm() {
  const [form] = Form.useForm()

  const onSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <Form
      layout="vertical"
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
      <Form.Item label="Loyiha Ishtirikchilari">
        <Select mode="multiple" options={[{ value: 'lucy', label: 'Sardor Omonov' }]} />
      </Form.Item>

      <Space className="d-flex my-2 justify-end w-full">
        <Button type="primary" htmlType="submit">
          Saqlash
        </Button>
      </Space>
    </Form>
  )
}

export default ProjectUserForm
