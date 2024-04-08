<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
  

// 状态管理
const email = ref('');
const password = ref('');
let errorMessage = '';

// 注册相关状态管理
const registerEmail = ref('');
const registerPassword = ref('');
const confirmPassword = ref('');
let registerErrorMessage = '';

// 验证注册信息
const validateRegisterForm = () => {
  registerErrorMessage = '';
  
  // 密码验证规则
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(registerPassword.value);
  if (!isValidPassword) {
    registerErrorMessage = '密码必须由大小写字母和数字组成，长度在8至16个字符之间。';
    return false;
  }

  // 确认密码验证
  if (registerPassword.value !== confirmPassword.value) {
    registerErrorMessage = '两次输入的密码不一致，请重新输入。';
    return false;
  }

  // 如果所有验证通过，则返回true
  return true;
};

// 监听confirmPassword变化时自动触发验证
watch(confirmPassword, validateRegisterForm);

// 异步处理注册
async function RegisterRequest(email, password) {
  if (!validateRegisterForm()) {
    return;
  }

  try {
    // 发送注册请求到后端API
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('注册过程中发生错误，请稍后重试。');
    }

    // 注册成功后的操作，例如显示成功提示或跳转回登录页面
    alert('注册成功！');
    switchToLogin();
  } catch (error) {
    registerErrorMessage = error.message;
  }
}

// 异步处理登录
async function LoginRequest(email, password) {
  try {
    console.log('LoginRequest');
    // 发送登录请求到后端API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    // 登录成功后的操作，例如跳转到主页
    router.push('/layout');
  } catch (error) {
    errorMessage = '用户名或密码错误，请重新输入。';
  }
}


// 切换视图函数
const currentView = ref('login');
const switchToLogin = () => {
  currentView.value = 'login';
  errorMessage = '';
  registerErrorMessage = '';
};
const switchToRegister = () => {
  currentView.value = 'register';
  errorMessage = '';
  registerErrorMessage = '';
};


</script>

<template>
  <div class="login-page">
    <!-- 登录表单区域 -->
    <transition name="fade">
      <form v-if="currentView === 'login'" @submit.prevent="LoginRequest">
        <h1>Login</h1>
        
        <label for="email">邮箱:</label>
        <input type="email" id="email" v-model="email" required />
      
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required />
        
        <button type="submit">登录</button>

        <p v-if="errorMessage">{{ errorMessage }}</p>
        
        <router-link to="#" @click.prevent="switchToRegister">还没有账号？去注册</router-link>
      </form>
    </transition>

    <!-- 注册表单区域 -->
    <transition name="fade">
      <form v-if="currentView === 'register'" @submit.prevent="RegisterRequest">
        <h1>Register</h1>
        
        <label for="register-email">邮箱:</label>
        <input type="email" id="register-email" v-model="registerEmail" required />
      
        <label for="register-password">密码:</label>
        <input type="password" id="register-password" v-model="registerPassword" required />
        
        <label for="confirm-password">确认密码:</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" required />

        <button type="submit">注册</button>

        <p class="error-message" v-if="registerErrorMessage">{{ registerErrorMessage }}</p>
        
        <router-link to="#" @click.prevent="switchToLogin">已有账号？去登录</router-link>
      </form>
    </transition>
  </div>
</template>



<style scoped>
  .login-page {
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #218068;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #22703b;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }

  /* 添加过渡效果 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>