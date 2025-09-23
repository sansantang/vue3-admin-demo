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
}
