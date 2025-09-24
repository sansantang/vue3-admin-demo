import Mock from 'mockjs'
import userMock from './mockData/userMock.js'

Mock.mock('/api/home/getTableData', 'get', {
  code: 200,
  data: userMock.getDataTavle(),
})

// 添加一个默认导出，确保模块被正确加载
export default Mock
