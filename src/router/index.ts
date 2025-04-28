import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue' // This is your reservation page component
import Success from '../views/Success.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/success',
    name: 'Success',
    component: Success
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
