// router.js
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import CoffeeList from './components/CoffeeList.vue';
import Admin from './components/Admin.vue';
import Admintest from './components/Admintest.vue';



const routes = [
  {
    path: '/',
    name: 'Home',
    component: App,
  },
  {
    path: '/coffee-list',
    name: 'CoffeeList',
    component: CoffeeList,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin-test',
    name: 'Admintest',
    component: Admintest,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;