import { defineStore } from 'pinia'
import { ref } from 'vue'

//组合式写法
export const useMenuStore = defineStore('menuStore', () => {
  const isCollapse = ref(false)
  const tags = ref([
    {
      label: '首页',
      name: 'home',
      path: '/home',
      icon: 'home',
    },
  ])

  function changeIsCollapse() {
    isCollapse.value = !isCollapse.value
  }

  function selectMenuTotags(item: any) {
    const find = tags.value.find((tag) => tag.name === item.name)
    if (find) {
      // return find
    } else {
      tags.value.push(item)
    }
    console.log(tags.value)
  }

  return { isCollapse, tags, changeIsCollapse, selectMenuTotags }
})
