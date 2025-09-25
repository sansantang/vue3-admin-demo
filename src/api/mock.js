import Mock from 'mockjs'
import homeMock from './mockData/homeMock.js'
import userMock from './mockData/userMock.js'

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

Mock.mock('/api/user/getUserData', 'get', {
  code: 200,
  result: userMock.getUserList(),
})

// 添加一个默认导出，确保模块被正确加载
export default Mock
