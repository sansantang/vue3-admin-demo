import Mock from 'mockjs'
import userMock from './mockData/userMock.js'
// Mock.mock('/api/home/getTableData', 'get', {
//   code: 200,
//   data: userMock.getDataTavle(),
// })
Mock.mock('/api/home/getTableData', 'get', () => {
  return {
    code: 400,
    message: 'Bad Request',
    data: null,
  }
})
