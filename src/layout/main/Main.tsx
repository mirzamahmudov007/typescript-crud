import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { Layout } from 'antd'

type Props = { width: number }

function Main({ width }: Props) {
  return (
    <Layout.Content
      style={{
        padding: width < 650 ? '0 4px 4px' : '4px 10px 10px',
        marginTop: width < 650 ? 4 : 6,
        minHeight: 280,
        overflow: 'auto',
        position: 'relative'
      }}
    >
      <Suspense>
        <Outlet />
      </Suspense>
    </Layout.Content>
  )
}

export default Main
