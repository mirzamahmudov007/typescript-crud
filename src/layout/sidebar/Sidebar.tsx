import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import SidebarProfile from './SidebarProfile'
import SidebarMenu from './SidebarMenu'
import { Layout } from 'antd'
const { Sider } = Layout

function SiderMenu() {
  const { configStore } = useStore()
  return (
    <Sider
      width="250"
      theme={configStore.themeStyle}
      trigger={null}
      collapsible
      collapsed={configStore.collapsed}
      className="cs-aside"
    >
      <SidebarProfile />
      <SidebarMenu />
    </Sider>
  )
}

export default observer(SiderMenu)
