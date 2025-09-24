const env = import.meta.env.MODE || 'prod'

interface EnvConfigType {
  [key: string]: {
    baseURL: string
  }
}

const EnvConfig: EnvConfigType = {
  development: {
    baseURL: 'http://localhost:8080',
  },
  prod: {
    baseURL: 'https://api.github.com',
  },
}

// 获取当前环境配置，默认使用prod
const currentEnvConfig = EnvConfig[env] || EnvConfig.prod

export default {
  env,
  baseURL: currentEnvConfig.baseURL,
  mock: false,
}
