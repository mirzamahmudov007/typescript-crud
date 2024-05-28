import './assets/style.css'
import OneIDSVG from './components/OneID'
import Login from './Login'
import { loginOneId } from '@/http'

function LoginWrapper() {
  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h3>Yer Aksiya</h3>
        <div className="login_oneid" onClick={loginOneId}>
          <OneIDSVG />
        </div>
        <Login />
      </div>
    </div>
  )
}
export default LoginWrapper
