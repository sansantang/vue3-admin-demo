import Mock from 'mockjs'
import userMock from './mockData/homeMock.js'

Mock.mock('/api/home/getTableData', 'get', {
  code: 200,
  data: userMock.getDataTavle(),
})

Mock.mock('/api/home/getCountData', 'get', {
  code: 200,
  data: userMock.getCountData(),
})

Mock.mock('/api/home/getChartData', 'get', {
  code: 200,
  data: userMock.getChartData(),
})

// 添加一个默认导出，确保模块被正确加载
export default Mock
