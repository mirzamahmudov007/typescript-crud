import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Tag, Tooltip } from 'antd'
import type { GetProp, TableProps } from 'antd'
import { CloudDownloadOutlined, StepForwardOutlined } from '@ant-design/icons'
import { MdOutlineNotStarted } from 'react-icons/md'

import { getTasks, TaskType } from '@/http'

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

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [status, setStatus] = useState<string>()
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 }
  })

  const handleChangeStatus = (s: string) => {
    setStatus(s)
  }

  type GroupBtn = {
    icon: React.ReactElement
    title: string
  }

  const groupBtn = (arrIcons: GroupBtn[]) => {
    return (
      <div className="flex gap-2 ">
        {arrIcons.map((i: GroupBtn) => (
          <Tooltip title={i.title}>
            <Button type="primary" onClick={() => handleChangeStatus('Bajarish')} shape="circle" icon={i.icon} />
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
      render: (t) => {
        if (t === 'CREATED') {
          const arrBtn = [
            { icon: <StepForwardOutlined />, title: 'Bajarish' },
            { icon: <StepForwardOutlined />, title: "Yo'naltish" },
            { icon: <StepForwardOutlined />, title: 'Bekorqilish' }
          ]
          return groupBtn(arrBtn)
        }
        if (t == 3) {
          return (
            <div className="flex gap-2">
              <Button size="small" type="primary">
                Yo'naltish
              </Button>
              <Button size="small" type="primary">
                Yakunlash
              </Button>
            </div>
          )
        }

        if (t == 2) {
          return (
            <div className="flex gap-2">
              <Button size="small" type="primary">
                Aktivlash
              </Button>
              <Button size="small" type="primary">
                Yakunlash
              </Button>
            </div>
          )
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
      <div className="flex gap-4"></div>
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
