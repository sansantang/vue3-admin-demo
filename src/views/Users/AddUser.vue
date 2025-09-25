<template>
  <el-dialog v-model="localDialogVisible" title="添加用户" width="500">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="form.age" type="number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.addr" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:dialogVisible'])

// 本地对话框可见性状态
const localDialogVisible = ref(false)

// 监听父组件传入的dialogVisible属性变化
watch(() => props.dialogVisible, (newVal) => {
  localDialogVisible.value = newVal
})

// 监听本地对话框状态变化，通知父组件
watch(() => localDialogVisible.value, (newVal) => {
  if (props.dialogVisible !== newVal) {
    emit('update:dialogVisible', newVal)
  }
})

const formLabelWidth = '120px'

const form = ref({
  name: '',
  age: '',
  sex: 1,
  birth: '',
  addr: ''
})

// 关闭对话框
const closeDialog = () => {
  localDialogVisible.value = false
}

// 提交表单
const submitForm = () => {
  // 这里可以添加表单验证和提交逻辑
  console.log('提交的表单数据:', form.value)
  // 提交成功后关闭对话框
  localDialogVisible.value = false
}
</script>

<style scoped></style>
