import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由页面的懒加载
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
