import { FC } from 'react'
import RouterConfig from '@/router/index'
import { useStore } from '@/store/index'
import { observer } from 'mobx-react-lite'
import { ConfigProvider, theme } from 'antd'
import '@/assets/styles/index.scss'

const App: FC = () => {
  const { configStore } = useStore()
  const { token } = theme.useToken()

  return (
    <ConfigProvider theme={{ token: { ...token, ...configStore.theme } }}>
      <RouterConfig />
    </ConfigProvider>
  )
}

export default observer(App)
