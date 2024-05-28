import { useState, useEffect } from 'react'
import { Card, Modal, Table, Form, Switch, Input, Space, Button, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import type { TablePaginationConfig } from 'antd/es/table'
import { getPermissions, postPermission, getPermission, putPermission, PermissionFormDataType } from '@/http'
import { getParams } from './utils/assets'

interface PermissionDataType extends PermissionFormDataType {
  id: string
}

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

const columns = [
  { title: 'id', dataIndex: 'id', width: '5%' },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Code', dataIndex: 'code' },
  { title: 'Description', dataIndex: 'description' },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (h: boolean) => <Tag color={h ? 'success' : 'error'}>{h ? 'Active' : 'No Active'}</Tag>
  }
]

function Permissions() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [dataId, setDataId] = useState('')
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 10, total: 10 }
  })

  const [form] = Form.useForm()
  const showModal = () => setOpen(true)
  const hideModal = () => {
    setOpen(false)
    setDataId('')
    form.setFieldsValue(initialValues)
  }

  const fetchData = () => {
    setLoading(true)

    getPermissions(getParams(tableParams))
      .then((data) => {
        setData(data.permissionsList)
        setTableParams({
          ...tableParams,
          pagination: { ...tableParams.pagination, total: data.count }
        })
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [JSON.stringify(tableParams)])

  const handleTableChange = (pagination: TablePaginationConfig, filters: any, sorter: any) => {
    setTableParams({ pagination, filters, ...sorter })
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  const handleRowClik = (e: PermissionDataType) => {
    console.log(e)
    showModal()
    getPermission(e.id).then((res) => {
      const { name, description, code, status } = res
      form.setFieldsValue({ name, description, code, status })
      setDataId(e.id)
    })
  }

  const handleSubmit = (e: PermissionFormDataType) => {
    const fn = dataId ? putPermission(dataId, e) : postPermission(e)

    fn.then(() => {
      fetchData()
      hideModal()
      form.setFieldsValue(initialValues)
    })
  }

  const titleModel = dataId ? "Ruxsat o'zgartirish" : "Ruxsat qo'shish"

  return (
    <Card
      title="Ruxsatlar"
      extra={
        <Button type="primary" onClick={showModal}>
          Qo'shish
        </Button>
      }
    >
      <Modal title={titleModel} open={open} onCancel={hideModal} footer={null}>
        <Form
          form={form}
          className="mt-6"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          labelAlign="left"
          initialValues={initialValues}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item label="Status" name="status">
            <Switch />
          </Form.Item>
          <Form.Item label="Nomi" name="name" rules={[{ required: !!validation.name, message: validation.name }]}>
            <Input />
          </Form.Item>
          <Form.Item label="code" name="code" rules={[{ required: !!validation.code, message: validation.code }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Ma'lumot"
            name="description"
            rules={[{ required: !!validation.description, message: validation.description }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Space className="d-flex mb-2 justify-end w-full">
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Space>
        </Form>
      </Modal>

      <Table
        size="small"
        bordered={true}
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => handleRowClik(record)
        })}
        rowKey={(record: PermissionDataType) => record?.id}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  )
}

export default observer(Permissions)
