import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Player from '../components/Player.vue'
import { hasAccessToken } from '../utils/access'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  console.log(hasAccessToken(), '是否有权限', localStorage.getItem('spotify_access_token'))
  if (!hasAccessToken() && to.name !== 'login') next({ name: 'login' })
  else next()
})

export default router
