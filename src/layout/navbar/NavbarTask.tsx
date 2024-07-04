import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import ModalContent from './ModalContent'
function NavbarTask() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <React.Fragment>
      <Modal width={900} title="Topshiriq" footer={false} open={isModalOpen} onCancel={handleCancel}>
        <ModalContent />
      </Modal>
      <Button type="primary" onClick={showModal}>
        + Topshiriq yaratish
      </Button>
    </React.Fragment>
  )
}

export default NavbarTask
