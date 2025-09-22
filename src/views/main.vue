<script setup>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
</script>

<template>
    <div class="common-layout">
        <el-container class="common-container">
            <el-aside width="200px">
                <CommonAside />
            </el-aside>
            <el-container>
                <!-- 侧边栏 -->
                <el-header class="common-header">
                    <CommonHeader />
                </el-header>
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
