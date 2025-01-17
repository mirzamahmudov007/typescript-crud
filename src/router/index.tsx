import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes from './routes'
import Loading from '@/components/loading'
import Auth from '@/components/auth'

function RouterConfig() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes?.map((item) => (
            <Route
              path={item.path}
              element={
                item.name === 'login' ? (
                  <item.component />
                ) : (
                  <Auth>
                    <item.component />
                  </Auth>
                )
              }
              key={item.name}
            >
              {item.children?.map((child) => (
                <Route path={child.path} element={<child.component />} key={child.name} />
              ))}
            </Route>
          ))}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default RouterConfig
