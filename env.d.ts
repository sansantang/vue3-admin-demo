/// <reference types="vite/client" />

import type homeApi from './src/api/ApiService/homeApi'

declare module 'vue' {
  interface ComponentCustomProperties {
    $homeApi: typeof homeApi
    $userApi: typeof userApi
  }
}
