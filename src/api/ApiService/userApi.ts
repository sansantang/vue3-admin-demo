import request from '../request'

export default {
  getUserData(config: object) {
    return request({
      url: '/api/user/getUserData',
      method: 'get',
      params: config,
    })
  },
}
