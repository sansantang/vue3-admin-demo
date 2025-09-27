import Mock from 'mockjs'
import homeMock from './mockData/homeMock.js'
import userMock from './mockData/userMock.js'
import permissionMock from './mockData/permisson.js'

Mock.mock('/api/home/getTableData', 'get', {
  code: 200,
  data: homeMock.getDataTavle(),
})

Mock.mock('/api/home/getCountData', 'get', {
  code: 200,
  data: homeMock.getCountData(),
})

Mock.mock('/api/home/getChartData', 'get', {
  code: 200,
  data: homeMock.getChartData(),
})

Mock.mock(/\/api\/user\/getUserData.*$/, 'get', (options) => {
  return {
    code: 200,
    result: userMock.getUserList(options),
  }
})

Mock.mock('/api/user/createUser', 'post', userMock.createUser)

Mock.mock('/api/user/updateUser', 'post', userMock.updateUser)
Mock.mock('/api/login', 'post', permissionMock.getMenu)
// 添加一个默认导出，确保模块被正确加载
export default Mock
