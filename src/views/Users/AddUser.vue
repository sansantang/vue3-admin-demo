<template>
  <el-dialog v-model="localDialogVisible" :title="action === 'add' ? '添加用户' : '编辑用户'" width="800">
    <el-form ref="formRef" :model="form" :inline="true" :rules="rules">
      <el-row :span="24">
        <el-col :span="12">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" 年龄" :label-width="formLabelWidth" prop="age">
            <el-input v-model="form.age" type="number" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" :label-width="formLabelWidth" prop="sex" style="display: flex;">
            <!-- 确保el-select的value和el-option的value类型一致 -->
            <el-select v-model="form.sex" placeholder="请选择性别" clearable>
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出生日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.addr" autocomplete="off" />
          </el-form-item>
        </el-col>

      </el-row>
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

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { ref, watch, defineProps, defineEmits, reactive, getCurrentInstance } from 'vue'

const instance = getCurrentInstance();

if (!instance) {
  throw new Error('getCurrentInstance() returned null');
}
const { proxy } = instance;

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  action: {
    type: String,
    default: 'add'
  },
  userData: {
    type: Object as () => RuleForm,
    default: () => ({})
  }
})


const emit = defineEmits(['update:dialogVisible', 'callback:refreshTable'])

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

// 在其他watch之后添加对userData的监听
watch(() => props.userData, (newVal: RuleForm) => {
  console.log('newVal开始', newVal)

  if (newVal && Object.keys(newVal).length > 0 && props.action === 'edit') {
    // 深拷贝用户数据到表单中
    form.value = { ...newVal }
    // 确保age字段类型正确（根据表单定义，age应该是字符串）
    form.value.age = newVal.age ? String(newVal.age) : ''
    // 确保birth字段格式正确
    if (newVal.birth) {
      form.value.birth = newVal.birth
    }
    console.log('newVal结束', newVal)
  }
}, { immediate: true, deep: true })

const formLabelWidth = '120px'

const form = ref<RuleForm>({
  name: '',
  age: '',
  sex: 1,
  birth: '',
  addr: ''
})

// #region 表单验证

// 表单实例引用
const formRef = ref<FormInstance>()

interface RuleForm {
  name: string,
  age: string,
  sex: number,
  birth: string,
  addr: string
}

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度应为 2 到 10 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],
  // sex: [
  //   { required: true, message: '请选择性别', trigger: 'change' },
  // ],
  // birth: [
  //   { required: true, message: '请选择出生日期', trigger: 'change' },
  // ],
  // addr: [
  //   { required: true, message: '请输入地址', trigger: 'blur' },
  //   { min: 5, max: 100, message: '地址长度应为 5 到 100 个字符', trigger: 'blur' },
  // ]
})

const formDate = (dateInput: string | Date): string => {
  let birthFormatted = '';
  if (typeof dateInput === 'object' && dateInput instanceof Date) {
    birthFormatted = `${dateInput.getFullYear()}-${(dateInput.getMonth() + 1).toString().padStart(2, '0')}-${dateInput.getDate().toString().padStart(2, '0')}`;
  } else if (typeof dateInput === 'string') {
    // 如果是字符串，尝试解析为日期
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      birthFormatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    } else {
      birthFormatted = dateInput;
    }
  }
  return birthFormatted;
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
    if (valid) {
      // 格式化日期为YYYY-MM-DD

      console.log(typeof form.value.birth)
      let birthFormatted = '';
      if (form.value.birth) {
        birthFormatted = formDate(form.value.birth)
      }

      const formData = {
        ...form.value,
        birth: birthFormatted
      };

      // 这里可以添加表单验证和提交逻辑
      console.log('提交的表单数据:', formData)
      if (props.action === 'add') {
        proxy!.$userApi.createUser(formData).then(res => {
          if (res.code === 200) {
            (formRef.value as FormInstance).resetFields() //重置表单
            emit('callback:refreshTable') //父组件刷新表格
            // 提交成功后关闭对话框
            localDialogVisible.value = false
          } else {
            ElMessage.error('添加用户失败')
          }
        })
      } else {
        proxy!.$userApi.updateUser(formData).then(res => {
          if (res.code === 200) {
            (formRef.value as FormInstance).resetFields() //重置表单
            emit('callback:refreshTable') //父组件刷新表格
            // 提交成功后关闭对话框
            localDialogVisible.value = false
          } else {
            ElMessage.error('更新用户失败')
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

// #endregion

// 关闭对话框
const closeDialog = () => {
  localDialogVisible.value = false

  // 重置表单数据和验证状态
  if (formRef.value) {
    (formRef.value as FormInstance).resetFields()
  }

  // 额外重置表单数据对象（确保完全清空）
  form.value = {
    name: '',
    age: '',
    sex: 1, // 默认值设为男
    birth: '',
    addr: ''
  };
}

</script>

<style scoped></style>
