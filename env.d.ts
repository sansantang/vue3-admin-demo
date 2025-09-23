/// <reference types="vite/client" />

import type homeApi from './src/api/homeApi'

declare module 'vue' {
  interface ComponentCustomProperties {
    $homeApi: typeof homeApi
  }
}
