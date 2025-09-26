<template>
  <div class="tags">
    <el-tag v-for="tag in tags" :key="tag.name" :closable="tag.name !== 'home'"
      :effect="tag.name === route.name ? 'dark' : 'plain'">
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">


import { useRoute } from 'vue-router';
import { useMenuStore } from '@/stores/useMenuStore';
const tags = useMenuStore().tags
const route = useRoute();
</script>

<style scoped>
.el-tag {
  margin: 0 10px 10px 0;
}
</style>
