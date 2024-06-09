import Ckeditor from '@/components/ckeditor/Ckeditor'
import { Form, Select, Input, Space, Button } from 'antd'

const initialValues = {
  name: '',
  description: '',
  code: '',
  status: false
}

const validation = {
  name: 'Iltimos name kiriting',
  description: "Iltimos to'liqroq ma'lumot kiriting",
  code: 'Iltimos code kiring'
}

function ModalContent() {
  const [form] = Form.useForm()

  const onSubmit = (e: any) => {
    console.log(e)
  }

  return (
    <Form
      layout="vertical"
      form={form}
      className="mt-6"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      labelAlign="left"
      initialValues={{}}
      onFinish={onSubmit}
      // initialValues={initialValues}
      autoComplete="off"
    >
      <div className="flex gap-4">
        <Form.Item className="w-full" label="Raqami">
          <Input value="NM-05" disabled={true} />
        </Form.Item>
        <Form.Item className="w-full" label="Topshiriq beruvchi" name="name">
          <Select defaultValue="lucy" options={[{ value: 'lucy', label: 'Sardor Omonov' }]} />
        </Form.Item>
        <Form.Item className="w-full" label="Muhumligi" name="code">
          <Select
            options={[
              { value: 'lucy', label: 'Oddiy' },
              { value: 'lucy', label: "O'rta" },
              { value: 'lucy', label: 'Muhum' },
              { value: 'lucy', label: "O'ta muhum" }
            ]}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Turi" name="code">
          <Select
            options={[
              { value: 'lucy', label: 'Xato' },
              { value: 'lucy', label: "Qo'shimcha" },
              { value: 'lucy', label: 'Yangi' }
            ]}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Topshiriq mazmuni">
          <Input value="Yer hisobotta yangi qo;shimcha qo;shish" />
        </Form.Item>
        <Form.Item className="w-full" label="Loyiha" name="code">
          <Select
            options={[
              { value: 'lucy', label: 'Yer elektron' },
              { value: 'lucy', label: 'Yer nazorat' },
              { value: 'lucy', label: 'Yer hisobot' }
            ]}
          />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-full" label="Asosiy ijrochi" name="code">
          <Select options={[{ value: 'lucy', label: 'Solijon Muhammad Ali' }]} />
        </Form.Item>
        <Form.Item className="w-full" label="Yordamchi ijrochi" name="code">
          <Select options={[{ value: 'lucy', label: 'Solijon Muhammad Ali' }]} />
        </Form.Item>
      </div>
      <div>
        <Ckeditor />
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
