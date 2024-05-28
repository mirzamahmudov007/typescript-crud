import { useState, useEffect } from 'react'
import { Card, Modal, Table, Form, Switch, Input, Space, Button, Tag, Select } from 'antd'
import { observer } from 'mobx-react-lite'
import type { TablePaginationConfig } from 'antd/es/table'
import { getRoles, getRole, patchRole, RoleFormDataType, RoleDataType } from '@/http'
import { getParams } from './utils/assets'
import type { SelectProps } from 'antd'

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

const options: SelectProps['options'] = []

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i
  })
}

function Roles() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [dataId, setDataId] = useState<number>()
  const [tableParams, setTableParams] = useState({
    pagination: { current: 1, pageSize: 10, total: 10 }
  })

  const [form] = Form.useForm()
  const showModal = () => setOpen(true)
  const hideModal = () => {
    setOpen(false)
    setDataId(0)
    form.setFieldsValue(initialValues)
  }

  const fetchData = () => {
    setLoading(true)

    getRoles(getParams(tableParams))
      .then((data) => {
        setData(data.rolesList)
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

  const handleRowClik = (e: RoleDataType) => {
    console.log(e)
    showModal()
    getRole(e.id).then((res) => {
      console.log(res)
      // const { name, description, code, status } = res
      // form.setFieldsValue({ name, description, code, status })
      // setDataId(e.id)
    })
  }

  const handleSubmit = (e: RoleFormDataType) => {
    dataId &&
      patchRole(dataId, e).then(() => {
        fetchData()
        hideModal()
        form.setFieldsValue(initialValues)
      })
  }

  const titleModel = "Rol o'zgartirish"

  return (
    <Card title="Rollar">
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
          <Form.Item label="Nomi" name="name" rules={[{ required: !!validation.name, message: validation.name }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tashkilot" name="organization_id">
            <Select style={{ width: '100%' }} placeholder="Tags Mode" options={options} />
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
        rowKey={(record: RoleDataType) => record?.id}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </Card>
  )
}

export default observer(Roles)
