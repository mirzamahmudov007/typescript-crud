import { observer } from 'mobx-react-lite'
import { loginOneId } from '@/http'

function Login() {
  return (
    <form>
      <button type="button" onClick={loginOneId}>
        Kirish
      </button>
    </form>
  )
}

export default observer(Login)
