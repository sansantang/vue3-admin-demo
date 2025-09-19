<script setup>
import CommonAside from "@/components/CommonAside.vue";
</script>

<template>
    <div class="common-layout">
        <el-container class="common-container">
            <el-header class="common-header">Header</el-header>
            <el-container>
                <!-- 侧边栏 -->
                <el-aside width="200px">
                    <CommonAside />
                </el-aside>
                <!-- 内容区域 -->
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.common-layout,
.common-container {
    height: 100vh;
}

.common-header {
    background-color: #333;
}
</style>
