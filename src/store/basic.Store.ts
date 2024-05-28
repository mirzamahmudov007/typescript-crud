import { makeAutoObservable } from 'mobx'
import { setAuth, getAuth, clearAuth } from '@/utils/token'
import { CallbackResponse } from '@/http/modules/login/index.d'

class BasicStore {
  constructor() {
    makeAutoObservable(this)
  }
  baseAuth = getAuth()

  login = (data: CallbackResponse) => {
    this.baseAuth = data
    setAuth(this.baseAuth)
  }

  logout = () => {
    clearAuth()
  }
}

export default BasicStore
