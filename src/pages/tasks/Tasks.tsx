import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Modal, Select, Space, Form, Table, Tag, Tooltip } from 'antd'
import type { GetProp, TableProps } from 'antd'
import { CloseCircleOutlined, CloudDownloadOutlined, RetweetOutlined, StepForwardOutlined } from '@ant-design/icons'

import { getTasks, TaskType } from '@/http'
import { get, patch } from '@/http/request'
import FAutoComplate from '@/components/form/FAutoComplate'
import { useFormik } from 'formik'

type ColumnsType<T> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface DataType {
  name: {
    first: string
    last: string
  }
  gender: string
  email: string
  login: {
    uuid: string
  }
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}
const initialValues = {
  forward_users: [''],
  comment: ''
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [status, setStatus] = useState<string>()
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 }
  })
  const [open, setOpen] = useState(false)
  const [dataId, setDataId] = useState<string>()

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      patch('/tasks/' + dataId, { action_type: status })
      // resetForm()
    }
  })

  const showModal = () => setOpen(true)
  const hideModal = () => {
    setOpen(false)
    setDataId('')
    formik.resetForm()
  }

  const handleChangeStatus = (s: string, id: string) => {
    setStatus(s)
    setDataId(id)
    showModal()
  }

  type GroupBtn = {
    icon: React.ReactElement
    title: string
    status: string
  }

  const groupBtn = (arrIcons: GroupBtn[], id: string) => {
    return (
      <div className="flex gap-2 ">
        {arrIcons.map((i: GroupBtn) => (
          <Tooltip title={i.title}>
            <Button type="primary" onClick={() => handleChangeStatus(i.status, id)} shape="circle" icon={i.icon} />
          </Tooltip>
        ))}
      </div>
    )
  }

  const columns: ColumnsType<DataType> = [
    { title: 'Raqam', dataIndex: 'uniqueNumber' },
    { title: 'Topshiroq beruvchi', dataIndex: 'assigner', render: (e) => e.firstName + ' ' + e.lastName },
    { title: 'Darajasi', dataIndex: 'importance', render: (type) => <Tag>{type}</Tag> },
    { title: 'Turi', dataIndex: 'type', render: (type) => <Tag color="red">{type}</Tag> },
    { title: 'Loyiha', dataIndex: 'project', render: (e) => e.title },
    { title: 'Holati', dataIndex: 'status', render: (e) => <Tag>{e}</Tag> },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Ijrochi', dataIndex: 'mainStaff', render: (e) => e.firstName + ' ' + e.lastName },
    {
      title: "Qo'shimcha",
      dataIndex: 'main',
      render: () => (
        <Button>
          <CloudDownloadOutlined />
        </Button>
      )
    },
    {
      // CREATED = "CREATED",
      // PROCESSING = "PROCESSING",
      // CHECKING = "CHECKING",
      // FINISHED = "FINISHED",
      // CANCELLED = "CANCELLED"
      title: 'Action',
      dataIndex: 'status',
      render: (t, i: any) => {
        if (t === 'CREATED') {
          const arrBtn = [
            { icon: <StepForwardOutlined />, title: 'Bajarish', status: 'START' },
            { icon: <RetweetOutlined />, title: "Yo'naltish", status: 'FORWARD' },
            { icon: <CloseCircleOutlined />, title: 'Bekorqilish', status: 'REJECT' }
          ]
          return groupBtn(arrBtn, i.id)
        }

        if (t == 'PROCESSING') {
          const arrBtn = [
            { icon: <RetweetOutlined />, title: "Yo'naltish", status: 'FORWARD' },
            { icon: <CloseCircleOutlined />, title: 'Yakunlash', status: 'FINISH' }
          ]
          return groupBtn(arrBtn, i.id)
        }

        return t
      }
    }
  ]

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    })
  }

  useEffect(() => {
    getTasks().then((res) => {
      setTasks(res.tasksList)
    })
  }, [])

  return (
    <Card title="Topshiriqlar ro'yxati" extra={<Button className="bg-green-800 text-white">Exel yuklab olish</Button>}>
      <Modal title={status} open={open} onCancel={hideModal} footer={null}>
        <Form
          className="mt-6"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          labelAlign="left"
          onFinish={formik.submitForm}
          autoComplete="off"
        >
          <Form.Item label="Tashkilot" name="forward_users">
            <FAutoComplate
              placeholder="Users"
              url="/users"
              value={formik.values.forward_users}
              mode="multiple"
              onChange={(user: string) => formik.setFieldValue('forward_users', user)}
              formatOptions={(e) => e.usersList.map((i: any) => ({ label: i.fullName, value: i.id }))}
            />
          </Form.Item>
          <Form.Item label="Izoh">
            <Input.TextArea
              value={formik.values.comment}
              name="comment"
              onChange={formik.handleChange}
            ></Input.TextArea>
          </Form.Item>
          <Space className="d-flex mb-2 justify-end w-full">
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Space>
        </Form>
      </Modal>
      <Table
        columns={columns}
        rowKey={(record) => JSON.stringify(record.id)}
        dataSource={tasks}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Card>
  )
}

export default Tasks
