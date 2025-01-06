import FruitDetail from '@/views/FruitDetail.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/details',
    name: 'details',
    component: FruitDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
