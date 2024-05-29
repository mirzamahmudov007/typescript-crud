import { makeAutoObservable } from 'mobx'
import { setUserInfo, getUserInfo, clearUserInfo } from '@/utils/token'
import { CallbackResponse } from '@/http/modules/login/index.d'

class BasicStore {
  constructor() {
    makeAutoObservable(this)
  }
  baseUser = getUserInfo()

  login = (data: CallbackResponse) => {
    this.baseUser = data
    setUserInfo(this.baseUser)
  }

  logout = () => {
    clearUserInfo()
  }
}

export default BasicStore
