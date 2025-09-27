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
    localStorage.setItem('menuList', JSON.stringify(list))
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

  // 移除所有动态添加的路由
  function removeDynamicRoutes() {
    const mainRoute = router.getRoutes().find((route) => route.name === 'main')
    if (mainRoute && mainRoute.children) {
      // 保留首页路由，移除其他动态添加的路由
      mainRoute.children = mainRoute.children.filter((child) => child.name === 'home')
    }
  }

  function addMenus(routerItem: any) {
    if (!routerItem || !Array.isArray(routerItem)) {
      console.error('菜单数据无效:', routerItem)
      return
    }

    // 先保存菜单数据
    updateMenuList(routerItem)

    // 移除所有动态路由（避免重复添加）
    removeDynamicRoutes()

    // 添加新的动态路由
    routerItem.forEach((menuItem: any) => {
      // 确保菜单项有必要的路由属性
      if (menuItem.path && menuItem.name) {
        try {
          // 构建正确的路由配置
          const routeConfig = {
            path: menuItem.path,
            name: menuItem.name,
            meta: {
              label: menuItem.label,
              icon: menuItem.icon,
            },
            // 使用组件解析函数
            component: resolveComponentByName(menuItem.name),
          }

          // 使用 router.addRoute() 方法正确添加路由
          router.addRoute('main', routeConfig)
          console.log(`已添加路由: ${menuItem.name} -> ${menuItem.path}`)
        } catch (error) {
          console.error(`添加路由失败: ${menuItem.name}`, error)
        }
      }
    })

    console.log('所有动态路由添加完成', router.getRoutes())
  }

  // 从 localStorage 恢复菜单和路由
  function restoreFromLocalStorage() {
    const savedMenuList = localStorage.getItem('menuList')
    if (savedMenuList) {
      try {
        const menuListData = JSON.parse(savedMenuList)
        addMenus(menuListData)
        console.log('已从本地存储恢复菜单和路由')
      } catch (error) {
        console.error('恢复菜单数据失败:', error)
        localStorage.removeItem('menuList')
      }
    } else {
      console.log('本地存储中没有菜单数据')
    }
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
    restoreFromLocalStorage,
  }
})
