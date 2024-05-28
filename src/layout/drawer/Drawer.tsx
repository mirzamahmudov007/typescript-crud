import { Layout, Drawer } from 'antd'
import { useStore } from '@/store'
import SidebarMenu from '../sidebar/SidebarMenu'
import DrawerProfile from './DrawerProfile'
import { observer } from 'mobx-react-lite'

type DrawerProps = {
  onClose: () => void
  visible: boolean
}

function DrawerWrapper({ visible, onClose }: DrawerProps) {
  const { configStore } = useStore()
  return (
    <Drawer
      placement="left"
      width="80%"
      open={visible}
      onClose={onClose}
      closable={false}
      styles={{ body: { padding: 0 } }}
    >
      <Layout.Sider
        collapsedWidth={0}
        theme={configStore.themeStyle}
        trigger={null}
        className="cs-aside !w-full h-full !max-w-none"
      >
        <DrawerProfile />
        <SidebarMenu />
      </Layout.Sider>
    </Drawer>
  )
}

export default observer(DrawerWrapper)
