import request from '../request'

export default {
  getUserData() {
    return request({
      url: '/api/user/getUserData',
      method: 'get',
    })
  },
}
