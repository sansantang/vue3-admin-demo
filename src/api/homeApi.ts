// 整个项目API的统一管理

import request from './request'

export default {
  getTableData() {
    return request({
      url: 'http://localhost:8080/api/home/getTableData',
      method: 'get',
    })
  },
}
