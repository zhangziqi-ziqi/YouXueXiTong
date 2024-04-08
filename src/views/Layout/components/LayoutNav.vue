<script setup>

</script>


<template>
      <!-- 头部导航栏 -->
      <header class="navbar">
        <nav>
          <ul class="nav-links">
            <li >
                <router-link to="/layout/locationRecommendation">地点推荐</router-link>
            </li>
            <li >
              <router-link to="/layout/mapTour">地图导览</router-link>
            </li>
            <li >
              <router-link to="/layout/travelDiary">游学日志</router-link>
            </li>
            <li >
              <router-link to="/layout/account">账户信息</router-link>
            </li>
          </ul>
        </nav>
      </header>
  </template>
  

  
  <style scoped>
  /* CSS样式 */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #3c3f3d;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .nav-links {
    display: flex;
    align-items: center;
  }
  
  .nav-links li {
    list-style-type: none;
    margin: 0 10px;
    font-weight: bold;
  }
  
  .nav-links li:not(:last-child) {
    border-right: 1px solid #ffffff;
  }
  
  .router-link-active {
    color: #b1e8b6c8;
  }
  </style>