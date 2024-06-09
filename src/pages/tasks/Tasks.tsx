import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Tag } from 'antd'
import type { GetProp, TableProps } from 'antd'
import { DatePicker, Space } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'

import { data } from './data'
import Avatar from 'antd/es/avatar/avatar'

const { RangePicker } = DatePicker

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

const columns: ColumnsType<DataType> = [
  {
    title: 'Raqam',
    dataIndex: 'id'
  },
  {
    title: 'Topshiroq beruvchi',
    dataIndex: 'add'
  },
  {
    title: 'Darajasi',
    dataIndex: 'important',
    render: (type) => <Tag>{type}</Tag>
  },
  {
    title: 'Turi',
    dataIndex: 'type',
    render: (type) => <Tag color="red">{type}</Tag>
  },
  {
    title: 'Loyiha',
    dataIndex: 'project'
  },
  {
    title: 'Holati',
    dataIndex: 'status',
    render: (t) => {
      if (t == 3) return <Tag color="processing">Jarayonda</Tag>
      if (t == 1) return <Tag color="red">Aktiv</Tag>
      return <Tag>Bajarildi</Tag>
    }
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Ijrochi',
    dataIndex: 'main'
  },
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
    title: 'Action',
    dataIndex: 'status',
    render: (t) => {
      if (t == 1) {
        return (
          <div className="flex gap-2 ">
            <Button size="small" className="bg-blue-200  py-0 px-2 text-[14px]">
              Bajarish
            </Button>
            <Button size="small" type="link" className="py-0 px-2 text-[14px]">
              Yo'naltish
            </Button>
            <Button size="small" className="bg-red-200  py-0 px-2 text-[14px]">
              Bekorqilish
            </Button>
          </div>
        )
      }
      if (t == 3) {
        return (
          <div className="flex gap-2">
            <Button size="small" type="link" className="py-0 px-2 text-[14px]">
              Yo'naltish
            </Button>
            <Button size="small" className="bg-red-700 text-white py-0 px-2 text-[14px]">
              Yakunlash
            </Button>
          </div>
        )
      }

      if (t == 2) {
        return (
          <div className="flex gap-2">
            <Button size="small" className="bg-red-100 py-0 px-2 text-[14px]">
              Aktivlash
            </Button>
            <Button size="small" className="bg-red-700 text-white py-0 px-2 text-[14px]">
              Yakunlash
            </Button>
          </div>
        )
      }
      return t
    }
  }
]

const Tasks: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  })

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    })
  }

  return (
    <Card title="Topshiriqlar ro'yxati" extra={<Button className="bg-green-800 text-white">Exel yuklab olish</Button>}>
      <div className="flex gap-4"></div>
      <Table
        columns={columns}
        rowKey={(record) => JSON.stringify(record)}
        dataSource={data}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Card>
  )
}

export default Tasks
