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

  createUser(data: object) {
    return request({
      url: '/api/user/createUser',
      method: 'post',
      data,
    })
  },
  updateUser(data: object) {
    return request({
      url: '/api/user/updateUser',
      method: 'post',
      data,
    })
  },
}
