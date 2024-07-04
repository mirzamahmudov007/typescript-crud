import { useState } from 'react'
import NavbarBread from './NavbarBread'
import NavbarUser from './NavbarUser'
import NavbarLanguage from './NavbarLanguage'
import NavbarSetting from './NavbarSetting'
import NavbarSettingDrawer from './NavbarSettingDrawer'
import NavbarTask from './NavbarTask'

interface IHeaderProps {
  width: number
}

function Navbar({ width }: IHeaderProps) {
  const [visible, setVisible] = useState(false)
  const openSetting = () => setVisible(true)
  const closeSetting = () => setVisible(false)

  return (
    <div className="flex justify-between items-center relative w-full text-black text-opacity-60">
      <NavbarBread width={width} />
      <NavbarTask />
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
