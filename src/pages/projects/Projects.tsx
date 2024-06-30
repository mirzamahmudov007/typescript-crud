import React, { useEffect, useState } from 'react'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Modal, Spin } from 'antd'
import ProjectForm from './ProjectForm'
import ProjectUserForm from './ProjectUserForm'
import { getProjects, getProject, ProjectFormDataType } from '@/http/modules/projects'

const { Meta } = Card

const Projects: React.FC = () => {
  const [isProjectModal, setIsProjectModal] = useState(false)
  const [isUserModal, setIsUserModal] = useState(false)

  const [initialValues, setinitialValues] = useState({})
  const [data, setData] = useState<ProjectFormDataType[]>()
  const [isLoading, setIsLoading] = useState(false)

  const showProjectModal = () => setIsProjectModal(true)
  const closeProjectModal = () => setIsProjectModal(false)

  const showUserModal = () => setIsUserModal(true)
  const closeUserModal = () => setIsUserModal(false)

  const fetchProject = () => {
    setIsLoading(true)
    getProjects()
      .then((res) => setData(res.projectsList))
      .finally(() => setIsLoading(false))
  }

  const getProjectId = (id: string) => {
    getProject(id).then((res) => {
      setinitialValues(res)
      showProjectModal()
    })
  }

  useEffect(() => {
    fetchProject()
  }, [])

  return (
    <div>
      <div className="flex justify-end w-full mb-2">
        <Button type="primary" onClick={showProjectModal}>
          Loyiha qo'shish
        </Button>
      </div>
      <Modal width={600} title="Topshiriq" footer={false} open={isProjectModal} onCancel={closeProjectModal}>
        <ProjectForm closeProjectModal={closeProjectModal} initialValues={initialValues} fetchProject={fetchProject} />
      </Modal>
      <Modal width={600} title="Topshiriq" footer={false} open={isUserModal} onCancel={closeUserModal}>
        <ProjectUserForm />
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          <Spin />
        ) : (
          data?.map((i) => (
            <Card
              key={i.id}
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
                <EditOutlined key="edit" onClick={() => getProjectId(i.id)} />,
                <EllipsisOutlined key="ellipsis" />
              ]}
            >
              <Meta
                // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title={i.title}
                description={i.description}
              />
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Projects
