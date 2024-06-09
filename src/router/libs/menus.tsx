import { lazy } from 'react'
import {
  AppstoreOutlined,
  ApartmentOutlined,
  SecurityScanOutlined,
  AimOutlined,
  FundProjectionScreenOutlined,
  UserSwitchOutlined,
  TeamOutlined
} from '@ant-design/icons'

export default [
  {
    path: '/',
    key: 'dashboard',
    label: 'Dashboard',
    icon: AppstoreOutlined,
    component: lazy(() => import('@/pages/dashboard/Dashboard'))
  },

  {
    path: '/projects',
    key: 'projects',
    label: 'Loyihalar',
    icon: FundProjectionScreenOutlined,
    component: lazy(() => import('@/pages/projects/Projects'))
  },
  {
    path: '/tasks',
    key: 'tasks',
    label: 'Topshiriqlar',
    icon: SecurityScanOutlined,
    component: lazy(() => import('@/pages/tasks/Tasks'))
  },

  {
    path: '/attendance',
    key: 'attendance',
    label: 'Davomat',
    icon: UserSwitchOutlined,
    component: lazy(() => import('@/pages/attendance/Attendance'))
  },
  {
    path: '/users',
    key: 'users',
    label: 'Foydalanuchilar',
    icon: TeamOutlined,
    component: lazy(() => import('@/pages/users/Users'))
  }
  // {
  //   path: '/positions',
  //   key: 'positions',
  //   label: 'Lavozimlar',
  //   icon: AimOutlined,
  //   component: lazy(() => import('@/pages/positions/Positions'))
  // },
  // {
  //   path: '/permissions',
  //   key: 'permissions',
  //   label: 'Ruxsatlar',
  //   icon: SecurityScanOutlined,
  //   component: lazy(() => import('@/pages/permissions/Permissions'))
  // }
]
