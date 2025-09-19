<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <h3>通用管理界面</h3>
        <div v-for="item in list" :index="item.path" :key="item.path">
            <div :if="item.children">
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.label }}</span>
                    </template>
                    </el-menu-item>
                </el-sub-menu>
            </div>
            <div :if="!item.children">
                <el-menu-item>
                    <el-icon>
                        <component :is="item.icon" />
                    </el-icon>
                    <span>{{ item.label }}</span>
                </el-menu-item>
            </div>
        </div>
    </el-menu>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const list = ref([
    {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'house',
        url: 'Home'
    },
    {
        path: '/mall',
        name: 'mall',
        label: '商品管理',
        icon: 'video-play',
        url: 'Mall'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'User'
    },
    {
        path: 'other',
        label: '其他',
        icon: 'location',
        children: [
            {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Page1'
            },
            {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Page2'
            }
        ]
    }
]);

const nochildren = computed(() => {
    return list.value.filter(item => !item.children);
});

const hadchildren = computed(() => {
    return list.value.filter(item => item.children);
});

</script>

<style scoped></style>