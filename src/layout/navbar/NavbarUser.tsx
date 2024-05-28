import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Avatar, Dropdown } from 'antd'
import { useStore } from '@/store/index'
import type { MenuProps } from 'antd'
import { ImportOutlined } from '@ant-design/icons'
import user from '@/assets/imgs/frame/user.png'

function NavbarUser() {
  const { basicStore } = useStore()
  const navigate = useNavigate()

  const handleUserLogout = (key: string) => {
    if (key === 'logout') {
      basicStore.logout()
      navigate('/login', { replace: true })
    }
  }

  const userItems = [
    {
      label: 'Chiqish',
      key: 'logout',
      icon: <ImportOutlined />,
      hander: handleUserLogout
    }
  ]

  const userMenu: MenuProps['items'] = userItems.map((item) => ({
    key: item.key,
    label: (
      <div onClick={() => item.hander(item.key)}>
        {item.icon} {item.label}
      </div>
    )
  }))

  return (
    <Dropdown menu={{ items: userMenu }} placement="bottomRight">
      <div className="w-14 text-center cursor-pointer hover:bg-gray-100">
        <Avatar src={user} />
      </div>
    </Dropdown>
  )
}

export default observer(NavbarUser)
