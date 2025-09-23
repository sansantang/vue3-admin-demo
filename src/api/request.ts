import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create()
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
service.interceptors.response.use((res) => {
  const { status, data, statusText } = res
  if (status === 200) {
    return data
  } else {
    const NETWORK_ERROR = '网络请求出错'
    ElMessage.error(statusText || NETWORK_ERROR)
    return Promise.reject(statusText || NETWORK_ERROR)
  }
})

function request(options: AxiosRequestConfig) {
  options.method = options.method || 'get'
  return service(options)
}

export default request
