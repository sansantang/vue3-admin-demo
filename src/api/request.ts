import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import config from '../config'
// 创建axios实例
const service = axios.create({
  // timeout: 30000, // 请求超时时间
  baseURL: config.baseURL,
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (config.url !== '/api/login') {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use(
  (res) => {
    const { status, data, statusText } = res
    if (status === 200) {
      return data
    } else {
      const NETWORK_ERROR = '网络请求出错'
      ElMessage.error(statusText || NETWORK_ERROR)
      return Promise.reject(statusText || NETWORK_ERROR)
    }
  },
  (error) => {
    // 处理网络错误、超时等情况
    if (error.response) {
      // 服务器返回了错误状态码
      ElMessage.error(`请求失败: ${error.response.status}`)
    } else if (error.request) {
      // 请求已发送但没有收到响应
      ElMessage.error('网络连接失败')
    } else {
      // 设置请求时发生错误
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  },
)

function request(options: AxiosRequestConfig) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  // 在mock模式下，不设置baseURL，让Mock.js拦截请求
  if (config.env !== 'prod' && config.mock) {
    service.defaults.baseURL = ''
  } else {
    service.defaults.baseURL = config.baseURL
  }

  return service(options)
}

export default request
