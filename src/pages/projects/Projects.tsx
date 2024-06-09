import React, { useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Modal } from 'antd'
import ProjectForm from './ProjectForm'
import ProjectUserForm from './ProjectUserForm'

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

const Projects: React.FC = () => {
  const [isProjectModal, setIsProjectModal] = useState(false)
  const [isUserModal, setIsUserModal] = useState(false)

  const showProjectModal = () => setIsProjectModal(true)
  const closeProjectModal = () => setIsProjectModal(false)

  const showUserModal = () => setIsUserModal(true)
  const closeUserModal = () => setIsUserModal(false)
  return (
    <div>
      <div className="flex justify-end w-full mb-2">
        <Button type="primary" onClick={showProjectModal}>
          Porject qo'shish
        </Button>
      </div>
      <Modal width={600} title="Topshiriq" footer={false} open={isProjectModal} onCancel={closeProjectModal}>
        <ProjectForm />
      </Modal>
      <Modal width={600} title="Topshiriq" footer={false} open={isUserModal} onCancel={closeUserModal}>
        <ProjectUserForm />
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {data.map((i, idx) => (
          <Card
            key={idx}
            className="shadow w-full"
            cover={
              <img
                alt="example"
                style={{ height: 50, objectFit: 'cover', objectPosition: 'top' }}
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={showUserModal} />,
              <EditOutlined key="edit" onClick={showProjectModal} />,
              <EllipsisOutlined key="ellipsis" />
            ]}
          >
            <Meta
              // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
              title={i.name}
              description={i.dec}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Projects
