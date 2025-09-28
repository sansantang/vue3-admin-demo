<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small" @click="changeIsCollapse">
        <el-icon>
          <component class="icons" :is="'menu'"></component>
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImageUrl" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
const getImageUrl = new URL("https://img2.baidu.com/it/u=2318884743,3754999155&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500").href;
import { useMenuStore } from '@/stores/useMenuStore'
const store = useMenuStore()
const changeIsCollapse = store.changeIsCollapse;

function logout() {
  store.logout()
}

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
}

.icons {
  width: 20px;
  height: 20px;
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
}

:deep(.breadcrumb span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
