import { Navigate } from 'react-router-dom'
import { getTokenAccess } from '@/utils/token'

interface IAuthProps {
  children?: React.ReactNode
}

function Auth({ children }: IAuthProps) {
  const token = getTokenAccess()

  return <>{children}</>
  // if (token) {
  //   return <>{children}</>
  // } else {
  //   return <Navigate to="/login" replace />
  // }
}

export default Auth
