import { makeAutoObservable } from 'mobx'
import i18n from 'i18next'

const ACTIVE_MENU = '@yeraksiyaAcitveMenu'
interface themeColor {
  primaryColor: any
  errorColor: string
  warningColor: string
  successColor: string
  infoColor: string
}

interface itemConfig {
  [propName: string]: any
}

class ConfigStore {
  constructor() {
    makeAutoObservable(this)
  }
  activeMenu = localStorage.getItem(ACTIVE_MENU) ? JSON.parse(localStorage.getItem(ACTIVE_MENU) || '') : ''
  locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'uz_UZB'
  themeStyle: any = localStorage.getItem('themeStyle') ? localStorage.getItem('themeStyle') : 'dark'
  theme: themeColor = {
    primaryColor: localStorage.getItem('primaryColor') ? localStorage.getItem('primaryColor') : '#722ED1',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff'
  }
  collapsed: boolean = false

  watchCollapsed = (isCollapsed: boolean) => {
    this.collapsed = isCollapsed
  }

  switchActiveMenu = (item: any) => {
    this.activeMenu = item
    localStorage.setItem(ACTIVE_MENU, JSON.stringify(item))
  }

  switchLanguage = (lang: string) => {
    this.locale = lang
    localStorage.setItem('locale', lang)
    i18n.changeLanguage(lang === 'uz_UZB' ? 'uz' : 'en')
  }

  switchStyle = (style: string) => {
    this.themeStyle = style
    localStorage.setItem('themeStyle', style)
  }

  switchColor = (color: string) => {
    this.theme.primaryColor = color
    localStorage.setItem('primaryColor', color)
  }
}

export default ConfigStore
