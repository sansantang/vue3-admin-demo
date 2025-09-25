/// <reference types="vite/client" />

import type homeApi from './src/api/ApiService/homeApi'
import type userApi from './src/api/ApiService/userApi'

declare module 'vue' {
  interface ComponentCustomProperties {
    $homeApi: typeof homeApi
    $userApi: typeof userApi
  }
}

// 添加 Vue 单文件组件类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
