<template>
  <div class="header">
    <Search />
    <div>{{title}}</div>
    <div>
      当前登录为 {{currtUser}}
      <span class='log-out' @click="logOut">登出</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { setMeInfo } from '../utils/access'
import Search from './Search.vue'
@Component({
  components: {
    Search
  }
})
export default class Header extends Vue {
  title = 'spotify@jjx'
  currtUser = ''
  created () {
    this.$axios.get('https://api.spotify.com/v1/me').then(res => {
      if (res.status === 200) {
        setMeInfo(res.data)
        this.currtUser = res.data.display_name
      }
    })
  }

  logOut () {
    localStorage.clear()
    this.$router.push({ name: 'login' })
  }
}
</script>
<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.log-out {
  cursor: pointer;
}
</style>
