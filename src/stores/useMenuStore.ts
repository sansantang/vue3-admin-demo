import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//组合式写法
export const useMenuStore = defineStore('menuStore', () => {
  const router = useRouter()
  const isCollapse = ref(false)
  const tags = ref([
    {
      label: '首页',
      name: 'home',
      path: '/home',
      icon: 'home',
    },
  ])
  const menuList = ref([])

  function updateMenuList(list: any) {
    menuList.value = list
  }

  function addMenusAndRouter(router: any) {
    if (localStorage.getItem('router')) {
      const list = JSON.parse(localStorage.getItem('router') || '')
      //1 赋值给 menuList.value(Menu展示)
      const findMainMenu = list.find((route) => route.name === 'main')
      const routes = router.getRoutes()
      const findMainRouter = routes.find((route) => route.name === 'main')
      menuList.value = findMainMenu.children
      console.log('addMenusAndRouter', findMainMenu.children)
      findMainMenu.children.forEach((menuItem: any) => {
        const t = findMainRouter.children.findIndex((item) => item.name === menuItem.name) > -1
        if (t) {
          return
        }
        // 确保菜单项有必要的路由属性
        if (menuItem.path && menuItem.name) {
          // 如果菜单项没有 component，添加一个默认的
          const routeItem = {
            ...menuItem,
            component: resolveComponentByName(menuItem.name),
          }

          // 添加到主路由的子路由中
          // findMain.children.push(routeItem)
          findMainRouter.children.push(routeItem)
        }
      })
      console.log('addMenusAndRouter', router.getRoutes())
    } else {
      return
    }
  }

  // 根据组件名解析对应的组件文件路径
  function resolveComponentByName(componentName: string) {
    // 根据项目中的实际组件文件映射
    const componentMap: Record<string, () => Promise<any>> = {
      home: () => import('@/views/Home.vue'),
      mall: () => import('@/views/Mall.vue'),
      user: () => import('@/views/Users/User.vue'),
      addUser: () => import('@/views/Users/AddUser.vue'),
      // 可以根据需要添加更多组件映射
    }

    // 返回对应的组件导入函数，如果不存在则返回默认组件
    return componentMap[componentName] || (() => import('@/views/Home.vue'))
  }

  function addMenus(routerItem: any) {
    const routes = router.getRoutes()
    const findMain = routes.find((route) => route.name === 'main')
    findMain.children = []
    // findMain.children.push(...routerItem)
    routerItem.forEach((menuItem: any) => {
      // 确保菜单项有必要的路由属性
      if (menuItem.path && menuItem.name) {
        // 如果菜单项没有 component，添加一个默认的
        const routeItem = {
          ...menuItem,
          component: resolveComponentByName(menuItem.name),
        }

        // 添加到主路由的子路由中
        findMain.children.push(routeItem)
      }
    })
    console.log(router.getRoutes())
    // console.log(items)
    const newRoutes = router.getRoutes()
    localStorage.setItem('router', JSON.stringify(newRoutes) || '')
    menuList.value = routerItem
  }

  function changeIsCollapse() {
    isCollapse.value = !isCollapse.value
  }

  function selectMenuTotags(item: any) {
    const find = tags.value.find((tag) => tag.name === item.name)
    if (find) {
      // return find
    } else {
      tags.value.push(item)
    }
    console.log(tags.value)
  }

  function removTag(item: any) {
    tags.value = tags.value.filter((tag) => tag.name !== item.name)
  }

  return {
    isCollapse,
    tags,
    menuList,
    updateMenuList,
    addMenus,
    addMenusAndRouter,
    changeIsCollapse,
    selectMenuTotags,
    removTag,
  }
})
