import { lazy } from 'react'
import { router } from './index.d'
import menuRoutes from './utils/menuRoutes'
import menus from './libs/menus'

export { menus }
export const childRoutes = menuRoutes(menus)

const routes: Array<router> = [
  {
    path: '/login',
    name: 'login',
    component: lazy(() => import('@/pages/login/index'))
  },
  {
    path: '/auth/oneid/callback',
    name: 'login',
    component: lazy(() => import('@/pages/login/OneIdCallBack'))
  },
  {
    path: '/',
    name: 'layout',
    component: lazy(() => import('@/layout/Layout')),
    children: [...(childRoutes as any)]
  },
  {
    path: '*',
    name: '404',
    component: lazy(() => import('@/pages/404/index'))
  }
]

export default routes
