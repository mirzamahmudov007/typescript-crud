import { useState } from 'react'
import NavbarBread from './NavbarBread'
import NavbarUser from './NavbarUser'
import NavbarLanguage from './NavbarLanguage'
import NavbarSetting from './NavbarSetting'
import NavbarSettingDrawer from './NavbarSettingDrawer'
import { Button, Modal } from 'antd'
import ModalContent from './ModalContent'

interface IHeaderProps {
  width: number
}

function Navbar({ width }: IHeaderProps) {
  const [visible, setVisible] = useState(false)
  const openSetting = () => setVisible(true)
  const closeSetting = () => setVisible(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="flex justify-between items-center relative w-full text-black text-opacity-60">
      <NavbarBread width={width} />

      <Modal width={900} title="Topshiriq" footer={false} open={isModalOpen} onCancel={handleCancel}>
        <ModalContent />
      </Modal>
      <Button type="primary" onClick={showModal}>
        + Topshiriq yaratish
      </Button>
      <div className="flex items-center">
        <NavbarUser />
        <NavbarLanguage />
        <NavbarSetting onSetting={openSetting} />
      </div>
      <NavbarSettingDrawer onSetting={closeSetting} isSetting={visible} />
    </div>
  )
}

export default Navbar
