// 整个项目API的统一管理

import request from './request'

export default {
  getTableData() {
    return request({
      url: '/api/home/getTableData',
      method: 'get',
    })
  },
}
