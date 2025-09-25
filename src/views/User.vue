<template>
    <div class="search">
        <el-button type="primary">新增</el-button>
        <el-form ref="formRef" :inline="true" :model="numberValidateForm" label-width="auto" class="demo-ruleForm">
            <el-form-item label="请输入" prop="age">
                <el-input placeholder="请输入用户名" v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="list">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.prop" :prop="item.prop" :label="item.label"
                :width="item.width" />
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default>
                    <el-button type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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

const numberValidateForm = reactive({
    age: '',
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
        }
    })
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
    width: 200,
}])
const tableData = ref<{
    name: string;
    age: number;
    sex: number;
    labelSex: string;
    birth: string;
    addr: string;
}[]>([])

async function getUserData() {
    try {
        const res = await proxy!.$userApi.getUserData();
        console.log(res);
        if (res.reuslt.code === 200) {
            tableData.value = res.reuslt.data.list;
            tableData.value.forEach(item => {
                item.labelSex = item.sex === 1 ? '男' : '女';
            })
        }
    } catch (error) {
        console.error('获取表格数据失败:', error);
    }
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
</style>