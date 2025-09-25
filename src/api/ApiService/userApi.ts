import request from '../request'

export default {
  getUserData(config: object) {
    return request({
      url: '/api/user/getUserData',
      method: 'get',
      data: config,
    })
  },

  deleteUser(data: object) {
    return request({
      url: '/api/user/deleteUser',
      method: 'get',
      data,
    })
  },
}
