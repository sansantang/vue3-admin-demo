import { defineStore } from 'pinia'
import { ref } from 'vue'

//组合式写法
export const useMenuStore = defineStore('menuStore', () => {
  const isCollapse = ref(true)

  function changeIsCollapse() {
    isCollapse.value = !isCollapse.value
  }

  return { isCollapse, changeIsCollapse }
})
