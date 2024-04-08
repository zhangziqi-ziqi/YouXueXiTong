<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 获取路由对象
const router = useRouter();
</script>

<template>
    <div class="home-page">
     <!-- 使用 img 标签展示背景图片 -->
    <img src="@/assets/background.jpg" alt="Background Image" class="background-image">
  
      <!-- 内容容器，用于整体居中 -->
      <div class="content-container">
        <!-- 主标题 -->
        <h1 class="title">游学系统</h1>
  
        <!-- 开始体验按钮 -->
        <router-link to="/layout" class="start-experience-btn">
          <span>开始体验</span>
        </router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .home-page {
    position: relative;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.256); /* 添加一个浅色背景，因为 img 标签不能设置 opacity */
  }
  
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 保证图片适应整个屏幕 */
    z-index: -1; /* 图片置于背景层 */
    /*opacity: 0.7; /* 设置半透明效果 */
  }
  
  .content-container {
    text-align: center;
    color: rgb(255, 255, 255);
    z-index: 1;
    padding: 50px; /* 添加内边距防止内容与背景图片重叠 */
    margin-top: 10%; /* 向下移动100px */
  }
  
  .title {
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 20px;
    letter-spacing: 4px;
  }
  
  .start-experience-btn {
    display: inline-block;
    width: 150px;
    height: 40px;
    line-height: 40px;
    color: white;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
    z-index: 1;
  
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
  
    span {
      display: inline-block;
    }
  }
  </style>