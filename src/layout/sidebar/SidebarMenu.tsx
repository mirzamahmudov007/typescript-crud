import { useState } from 'react'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { menus } from '@/router/routes'
import { Item } from '@/router/index.d'
import { childRoutes } from '@/router/routes'

function SidebarMenu() {
  const { configStore } = useStore()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [menuList]: Array<any> = useState(
    menus.map((ele: any) => {
      if (ele && ele.children)
        return {
          key: ele.key,
          icon: <ele.icon />,
          label: t(ele.label),
          children: ele?.children?.map((item: any) => {
            return {
              path: item.path,
              key: item.key,
              label: t(item.label),
              onClick: () => navigate(item.path)
            }
          })
        }
      else
        return {
          path: ele.path,
          key: ele.key,
          label: t(ele.label),
          icon: <ele.icon />,
          onClick: () => navigate(ele.path)
        }
    })
  )

  const handleClickItem: MenuProps['onClick'] = (item) => {
    const menu: Item | undefined = childRoutes.find((i) => i.key === item.key)
    if (menu && menu.path) {
      configStore.switchActiveMenu({
        select: item.keyPath,
        breadcrumb: t(menu.label)
      })
    }
  }
  return (
    <Menu
      theme={configStore.themeStyle}
      mode="inline"
      selectedKeys={configStore.activeMenu && configStore.activeMenu.select}
      onClick={handleClickItem}
      items={menuList}
    />
  )
}

export default observer(SidebarMenu)
