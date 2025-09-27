<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/useMenuStore'
const router = useRouter()
const loginForm = reactive({
  username: '',
  password: ''
})
const instance = getCurrentInstance();

if (!instance) {
  throw new Error('getCurrentInstance() returned null');
}
const { proxy } = instance;

async function handleLogin() {
  console.log(loginForm)
  const res = await proxy!.$loginApi.login(loginForm);
  console.log(res);
  if (res.code === 200) {
    localStorage.setItem('token', res.data.token)
    useMenuStore().updateMenuList(res.data.menuList)
    router.push({
      name: 'home'
    })
  }
}

</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.body-login {
  width: 100%;
  height: 100%;
  background-size: 100%;
  overflow: hidden;
}

.login-container {
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 250px auto;

  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }

  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
