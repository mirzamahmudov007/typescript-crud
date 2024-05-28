import { useState, useEffect } from 'react'
import { Card, Table, Tag } from 'antd'
import { observer } from 'mobx-react-lite'
import { getPositions, PositionDataType } from '@/http'

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

function Positions() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = () => {
    setLoading(true)

    getPositions()
      .then((data) => setData(data.positionsList))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Card title="Rollar">
      <Table
        size="small"
        bordered={true}
        columns={columns}
        dataSource={data}
        rowKey={(record: PositionDataType) => record?.id}
        loading={loading}
        pagination={false}
      />
    </Card>
  )
}

export default observer(Positions)
