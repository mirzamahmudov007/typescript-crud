import React from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'

const { Meta } = Card

const data = [
  {
    name: 'Yer eletoron',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting'
  },
  {
    name: 'Yer hisont',
    dec: 'Lorem Ipsis simply dummy text of the printing and typesettiver since the'
  },
  {
    name: 'Yer Nazorat',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  },
  {
    name: 'Yer Nazorat',
    dec: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
  }
]

const Projects: React.FC = () => (
  <div>
    <div className="flex justify-end w-full mb-2">
      <Button type="primary">Porject qo'shish</Button>
    </div>
    <div className="flex gap-5 flex-wrap">
      {data.map((i, idx) => (
        <Card
          className="shadow"
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              style={{ height: 50, objectFit: 'cover', objectPosition: 'top' }}
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />
          ]}
        >
          <Meta
            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
            title={i.name}
            description={i.dec}
          />
        </Card>
      ))}
    </div>
  </div>
)

export default Projects
