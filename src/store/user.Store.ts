import { makeAutoObservable } from 'mobx'
import { getUserMe } from '@/http'

class UserStore {
  constructor() {
    makeAutoObservable(this)
  }
  userData = {}

  getMe = () => {
    getUserMe().then((res) => {
      this.userData = res
    })
  }
}

export default UserStore
