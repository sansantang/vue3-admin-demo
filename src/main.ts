import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/sass/index.scss'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus' //导入element-plus组件库
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import homeApi from '@/api/homeApi'
import '@/api/mock'
import 'default-passive-events'

const app = createApp(App)
app.config.globalProperties.$homeApi = homeApi
app.use(createPinia())
app.use(router)
app.use(ElementPlus) //将 ElementPlus 插件注册到 Vue 应用中

app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
