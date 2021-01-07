import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { axios } from './utils'
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Object.defineProperty(Vue.prototype, '$axios', {
  get () { return axios }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
