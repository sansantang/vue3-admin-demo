<template>
  <el-aside :width="width">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-aside" :default-active="route.path"
      text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :collapse-transition="false">
      <h3 v-show="!isCollapse">通用管理后台</h3>
      <h3 v-show="isCollapse">后台</h3>
      <template v-for="item in list" :key="item.path">
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 0">
          <template #title>
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="children in item.children" :key="children.path" :index="children.path"
            @click="handleGoRouter(children.path)">
            <el-icon>
              <component :is="children.icon" />
            </el-icon>
            {{ children.label }}
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path" @click="handleGoRouter(item)">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>

</template>

<script setup lang="ts">

import { computed, ref } from 'vue';
import { useMenuStore } from '@/stores/useMenuStore';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const isCollapse = computed(() => useMenuStore().isCollapse);
const width = computed(() => isCollapse.value ? '64px' : '200px');
const list = computed(() => useMenuStore().menuList);

// const list = ref([
//   {
//     path: '/home',
//     name: 'home',
//     label: '首页',
//     icon: 'house',
//     url: 'Home'
//   },
//   {
//     path: '/mall',
//     name: 'mall',
//     label: '商品管理',
//     icon: 'video-play',
//     url: 'Mall'
//   },
//   {
//     path: '/user',
//     name: 'user',
//     label: '用户管理',
//     icon: 'user',
//     url: 'User'
//   },
//   {
//     path: 'other',
//     label: '其他',
//     icon: 'location',
//     children: [
//       {
//         path: '/page1',
//         name: 'page1',
//         label: '页面1',
//         icon: 'setting',
//         url: 'Page1'
//       },
//       {
//         path: '/page2',
//         name: 'page2',
//         label: '页面2',
//         icon: 'setting',
//         url: 'Page2'
//       }
//     ]
//   }
// ]);

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)

}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleGoRouter = (item: any) => {
  router.push(item.path)
  useMenuStore().selectMenuTotags(item);
}

</script>

<style scoped>
h3 {
  color: #fff;
  text-align: center;
}

.el-aside {
  height: 100vh;
  border: none;
  /* 移除边框 */
}
</style>
