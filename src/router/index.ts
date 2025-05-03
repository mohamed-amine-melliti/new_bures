import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue' // This is your reservation page component
import Success from '../views/Success.vue'
import payment_reservation from '../views/payment_reservation.vue'

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
  },

  {
    path: '/payment',
    name: 'Payment',
    component: payment_reservation
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
