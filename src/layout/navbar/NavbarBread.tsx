import { useStore } from '@/store/index'
import { Breadcrumb } from 'antd'

type NavbarBreadProps = {
  width: number
}

const roleList: { superadmin: string; observer: string } = {
  superadmin: 'Admin',
  observer: 'Kuzatuvchi'
}

function NavbarBread({ width }: NavbarBreadProps) {
  const { configStore, basicStore } = useStore()

  const role = () => {
    for (const [key, value] of Object.entries(roleList)) {
      return value
      // if (key === basicStore.baseAuth.userInfo.role) return value
    }
  }

  const breadItems = [
    {
      title: role()
    },
    { title: configStore.activeMenu.breadcrumb }
  ]

  return configStore.activeMenu.breadcrumb && width > 500 ? <Breadcrumb items={breadItems} /> : <>Main</>
}

export default NavbarBread
