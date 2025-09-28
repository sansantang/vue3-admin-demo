import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/sass/index.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' //导入element-plus组件库
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import homeApi from '@/api/ApiService/homeApi'
import userApi from '@/api/ApiService/userApi'
import loginApi from '@/api/ApiService/loginApi'
import '@/api/mock'
import 'default-passive-events'
import { useMenuStore } from '@/stores/useMenuStore'

//全局前置守卫beforeEach
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next({
      path: '/login',
    })
    return
  }

  const filerRouter = router.getRoutes().filter((item) => item.path === to.path)
  if (filerRouter.length === 0) {
    next({
      name: '404',
    })
    return
  }
  next()
})

const app = createApp(App)
app.config.globalProperties.$homeApi = homeApi
app.config.globalProperties.$userApi = userApi
app.config.globalProperties.$loginApi = loginApi
app.use(createPinia())

const stores = useMenuStore()
stores.restoreFromLocalStorage()
app.use(router)

app.use(ElementPlus) //将 ElementPlus 插件注册到 Vue 应用中
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

router.isReady().then(() => {
  app.mount('#app')
})
