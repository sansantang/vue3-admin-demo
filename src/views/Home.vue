<template setup>
    <div class="content">
        <div class="left">
            <el-card>
                <div class="userInfo">
                    <div class="userInfo_icon">
                        <img :src="getImageUrl" class="userIcon">
                    </div>
                    <div class="userInfo_info">
                        <h3>Admin</h3>
                        <p class="grey_text">超级管理员</p>
                    </div>
                </div>
                <template #footer>
                    <div class="logininfo">
                        <div>
                            <p class="grey_text">上次登录时间：<span>2023-08-01 10:00:00</span></p>

                        </div>
                        <div>
                            <p class="grey_text">上次登录地点：<span>中国</span></p>

                        </div>
                    </div>
                </template>
            </el-card>

            <el-card class="card_table">
                <el-table :data="tableData">
                    <el-table-column v-for="(value, key) in tableLabel" :key="key" :prop="key" :label="value" />
                </el-table>
            </el-card>
        </div>
        <div class="right">
            <el-card>
                <div class="card_count">
                    <div class="card_count_item" v-for="value in tableCountData" :key="value.name">
                        <div class="icons_box" :style="{ backgroundColor: value.color }">
                            <component :is="value.icon" class="icons">
                            </component>
                        </div>
                        <div class="count_info">
                            <p class="count_text">￥{{ value.value }}</p>
                            <p class="count_name">{{ value.name }}</p>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>

</template>

<script setup lang="ts">
import type { TableItem } from '@/interface/TableItem';
import { getCurrentInstance, ref, onMounted } from 'vue'

const getImageUrl = new URL("https://img2.baidu.com/it/u=2318884743,3754999155&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500").href;
const instance = getCurrentInstance();

if (!instance) {
    throw new Error('getCurrentInstance() returned null');
}
const { proxy } = instance;

// 表格数据
const tableData = ref<TableItem[]>([]);
const tableCountData = ref();

// 表格列标签
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
});

async function getTableData() {
    try {
        const res = await proxy!.$homeApi.getTableData();
        // console.log(res);
        if (Array.isArray(res.data)) {
            tableData.value = res.data;
        } else if (res.data) {
            // 如果是对象，将其包装在数组中
            tableData.value = []
            tableData.value = [...res.data];
        } else {
            // 如果没有数据，确保是空数组
            tableData.value = [];
        }
    } catch (error) {
        console.error('获取表格数据失败:', error);
        tableData.value = [];
    }
}

async function getCountData() {
    try {
        const res = await proxy!.$homeApi.getCountData();
        tableCountData.value = res.data;
        console.log(res);
    } catch (error) {
        console.error('获取Count数据失败:', error);
    }
}

onMounted(() => {
    getTableData();
    getCountData();
});

</script>

<style scoped>
.content {
    display: flex;
}

.left {
    width: 30%;
    background-color: bisque;
    margin-right: 2%;

    .userIcon {
        width: 100px;
        height: 100px;
        background-image: url("https://img2.baidu.com/it/u=2318884743,3754999155&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500");
        background-size: cover;
        background-position: center;
        border-radius: 50%;


    }

    .userInfo {
        display: flex;

        .userInfo_icon {
            margin-right: 20px;
        }

        .userInfo_info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .logininfo {
        span {
            color: #000;
        }
    }

    .card_table {
        margin-top: 20px;
    }
}

.grey_text {
    color: grey;
}

.right {
    width: 68%;
    background-color: aqua;

    .card_count {
        display: flex;
        flex-wrap: wrap;
        /*justify-content: space-between; */

        .card_count_item {
            width: 30%;
            margin-bottom: 20px;
            margin-right: 2%;
            display: flex;
            align-items: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

            .icons_box {
                width: 100px;
                height: 100px;
                /* background-color: #fff; */
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .icons {
                width: 50px;
                height: 50px;
                color: #fff;
            }

            .count_info {
                margin-left: 5px;
            }

            .count_text {
                font-size: 24px;
                font-weight: bold;
            }

            .count_name {
                font-size: 14px;
                color: grey;
            }
        }
    }
}

:deep(.el-card__footer) {
    width: 90%;
    margin: 0 auto;
}
</style>