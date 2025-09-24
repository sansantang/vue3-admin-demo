export default {
  data: () => ({
    id: '@id',
    name: '@name',
    age: '@integer(20,50)',
  }),
  getDataTavle: () => [
    {
      name: 'Java',
      todayBuy: '@integer(100,300)',
      monthBuy: '@integer(100,300)',
      totalBuy: '@integer(100,300)',
    },
    {
      name: 'Python',
      todayBuy: '@integer(100,300)',
      monthBuy: '@integer(100,300)',
      totalBuy: '@integer(100,300)',
    },
  ],
  getCountData: () => [
    {
      name: '今日支付订单',
      value: 1234,
      icon: 'SuccessFilled',
      color: '#2ec7c9',
    },
    {
      name: '今日收藏订单',
      value: 210,
      icon: 'StarFilled',
      color: '#ffb980',
    },
    {
      name: '今日未支付订单',
      value: 1234,
      icon: 'GoodsFilled',
      color: '#5ab1ef',
    },
    {
      name: '本月支付订单',
      value: 1234,
      icon: 'SuccessFilled',
      color: '#2ec7c9',
    },
    {
      name: '本月收藏订单',
      value: 210,
      icon: 'StarFilled',
      color: '#ffb980',
    },
    {
      name: '本月支付订单',
      value: 1234,
      icon: 'SuccessFilled',
      color: '#2ec7c9',
    },
  ],
}
