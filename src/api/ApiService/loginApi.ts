import request from '../request'

export default {
  login(data: object) {
    return request({
      url: '/api/login',
      method: 'post',
      data,
    })
  },
}
