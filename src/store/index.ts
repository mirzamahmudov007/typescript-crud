import React from 'react'
import ConfigStore from './config.Store'
import BasicStore from './basic.Store'
import UserStore from './user.Store'

class RootStore {
  public configStore: ConfigStore
  public basicStore: BasicStore
  public userStore: UserStore
  constructor() {
    this.configStore = new ConfigStore()
    this.basicStore = new BasicStore()
    this.userStore = new UserStore()
  }
}

const context = React.createContext(new RootStore())
export const useStore = () => React.useContext(context)
