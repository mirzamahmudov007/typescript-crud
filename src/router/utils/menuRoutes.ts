import { Item, MenuItem } from '@/router/index.d'

export default (menus: Array<MenuItem>) => {
  const childRoutes: Array<Item> = []
  menus.forEach((ele) => {
    if (ele && ele.children) {
      ele.children.forEach((item) => {
        item.name = item.key
      })
      childRoutes.push(...(ele as any).children)
    } else {
      childRoutes.push({ ...ele, name: ele.key })
    }
  })
  return childRoutes
}
