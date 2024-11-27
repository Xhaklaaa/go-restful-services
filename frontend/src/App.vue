<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <RouterLink to="/">Coffee Shop</RouterLink> |
      <RouterLink to="/coffee-list">Coffee List</RouterLink> |
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/admin-test">Admin-test</RouterLink>
    </nav>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f8f9fa;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 1000; /* Ensure it stays on top */
}

.navbar a {
  text-decoration: none;
  color: #333;
  margin: 0 15px;
}

.content {
  margin-top: 60px; /* Adjust based on the height of the navbar */
  flex: 1;
}
</style>