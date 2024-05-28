import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Tag } from 'antd'
import type { GetProp, TableProps } from 'antd'
import { DatePicker, Space } from 'antd'

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
    title: 'Rasm',
    dataIndex: 'picture',
    render: (picture) => <Avatar src={picture}></Avatar>,
    width: '5%'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%'
  },
  {
    title: 'Lavozim',
    dataIndex: 'position'
  },
  {
    title: "Bo'lim",
    dataIndex: 'nm'
  },
  {
    title: 'Phone',
    dataIndex: 'cell'
  },
  {
    title: 'Kelish',
    dataIndex: 'time',
    render: (time) => <Tag>{time}</Tag>
  },
  {
    title: 'Ketish',
    dataIndex: 'time',
    render: (time) => <Tag>06:00</Tag>
  },
  {
    title: 'Kechikish',
    dataIndex: 'date',
    render: (date) => (
      <Tag color={date.b ? 'red' : 'blue'}>
        {date.b && '-'}
        {date.n} minut
      </Tag>
    )
  }
]

const Attendance: React.FC = () => {
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
    <Card
      title="Xotimlaring ishga kelish vaqti"
      extra={<Button className="bg-green-800 text-white">Exel yuklab olish</Button>}
    >
      <div className="mb-2">
        <DatePicker />
      </div>
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

export default Attendance
