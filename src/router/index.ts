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
    path: '/playlist/:id',
    name: 'playlist',
    component: () => import('../views/Playlist.vue')
  },
  {
  path: '/artists/:id',
  name: 'artists',
  component: () => import('../views/Artists.vue')
},
{
  path: '/albums/:id',
  name: 'albums',
  component: () => import('../views/Albums.vue')
},
{
  path: '/usersPlaylist/:id',
  name: 'usersPlaylist',
  component: () => import('../views/UsersPlaylist.vue')
},
{
  path: '/search/:id',
  name: 'search',
  component: () => import('../views/Search.vue')
},
{
  path: '/user/:id',
  name: 'user',
  component: () => import('../views/User.vue')
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
