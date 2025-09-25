<template>
    <div class="search">
        <el-button type="primary">新增</el-button>
        <el-form ref="formRef" :inline="true" :model="searchForm" label-width="auto" class="demo-ruleForm">
            <el-form-item label="请输入">
                <el-input placeholder="请输入用户名" v-model="searchForm.name" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"
                :width="item.width ? item.width : ''" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" size="small" :total="userConfig.total"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const instance = getCurrentInstance();

if (!instance) {
    throw new Error('getCurrentInstance() returned null');
}
const { proxy } = instance;

const formRef = ref<FormInstance>()

const searchForm = reactive({
    name: '',
})

const userConfig = reactive({
    name: '',
    total: 0,
    page: 0
})


const submitForm = (formEl: FormInstance | undefined) => {
    console.log('formEl', formEl)
    console.log('searchForm', searchForm)
    userConfig.name = searchForm.name
    getUserData(userConfig);
}

// #region 表格数据
const handleClick = () => {
    console.log('click')
}
const tableLabel = ref([{
    prop: 'name',
    label: '姓名',
}, {
    prop: 'age',
    label: '年龄',
}, {
    prop: 'labelSex', // 性别根据数字显示文本
    label: '性别',
}, {
    prop: 'birth',
    label: '出生日期',
}, {
    prop: 'addr',
    label: '地址',
    width: 300,
}])

const tableData = ref<{
    name: string;
    age: number;
    sex: number;
    labelSex: string;
    birth: string;
    addr: string;
}[]>([])



async function getUserData(searchForm?: { name: string } | undefined) {
    try {
        const res = await proxy!.$userApi.getUserData(searchForm);
        console.log(res);
        if (res.code === 200) {
            tableData.value = res.result.data.list;
            tableData.value.forEach(item => {
                item.labelSex = item.sex === 1 ? '男' : '女';
            })
        }
        if (res.code === 200) {
            userConfig.total = res.result.data.count;
        }
    } catch (error) {
        console.error('获取表格数据失败:', error);
    }
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
    userConfig.page = val
    getUserData(userConfig);
}
// #endregion 表格数据

onMounted(() => {
    getUserData();
})
</script>

<style scoped>
.search {
    display: flex;
    justify-content: space-between;
}

.list {
    position: relative;

    .pagination {
        margin-top: 5px;
        position: absolute;
        right: 0;
    }
}
</style>