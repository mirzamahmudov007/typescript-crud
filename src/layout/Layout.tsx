import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import DrawerWrapper from './drawer/Drawer'
import Main from './main/Main'
import logoMini from '@/assets/svg/logo.svg'

function LayoutConfig() {
  const { configStore, userStore } = useStore()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useCallback(() => userStore.getMe(), [userStore.userData])
  useCallback(() => console.log('data'), [])

  const toggle = () => {
    if (width > 650) setCollapsed(!collapsed)
    setVisible(true)
  }

  const onClose = () => setVisible(false)

  const backHome = () => {
    navigate('/', { replace: true })
  }

  window.onresize = () => setWidth(window.innerWidth)

  useEffect(() => {
    width < 650 ? setCollapsed(true) : setCollapsed(false)
  }, [width])

  useEffect(() => {
    configStore.watchCollapsed(collapsed)
  }, [collapsed])

  return (
    <Layout className="h-full select-none">
      {width < 650 ? <DrawerWrapper onClose={onClose} visible={visible} /> : <Sidebar />}
      <Layout>
        <Layout.Header className="flex items-center !bg-white shadow-box !p-0">
          {width < 650 ? (
            <div className="flex ml-2 items-center text-3xl h-full text-center cursor-pointer" onClick={backHome}>
              <img src={logoMini} width={70} />
            </div>
          ) : (
            ''
          )}
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className:
              '!flex items-center h-full py-0 px-6 cursor-pointer transition-color duration-300 text-gray-500 mr-2.5 text-base hover:bg-gray-100',
            onClick: toggle
          })}
          <Navbar width={width} />
        </Layout.Header>
        <Main width={width} />
      </Layout>
    </Layout>
  )
}

export default observer(LayoutConfig)
