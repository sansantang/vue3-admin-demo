import Mock from 'mockjs'
import userMock from './mockData/userMock.js'
Mock.mock('/api/home/getTableData', 'get', {
  code: 200,
  data: userMock.getDataTavle(),
})
