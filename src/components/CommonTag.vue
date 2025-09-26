<template>
  <div class="tags">
    <el-tag v-for="(tag, index) in tags" :key="tag.name" :closable="tag.name !== 'home'"
      :effect="tag.name === route.name ? 'dark' : 'plain'" @click="handleGoRouter(tag)"
      @close="handleClose(tag, index)">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">


import { useRoute } from 'vue-router';
import { useMenuStore } from '@/stores/useMenuStore';
import router from '@/router';
import { computed } from 'vue';
const tags = computed(() => useMenuStore().tags)
const route = useRoute();
const store = useMenuStore()
function handleGoRouter(tag: any) {
  router.push(tag.path)
}

function handleClose(tag: any, index: number) {
  if (tag.name === 'home') return
  store.removTag(tag) //更新tag
  if (tag.name !== route.name) return

  //切换当前index的前一个tag
  const preTag = tags.value[index - 1]
  store.selectMenuTotags(preTag)
  router.push(preTag.path)
}
</script>

<style scoped>
.el-tag {
  margin: 0 10px 10px 0;
  cursor: pointer;
}
</style>
