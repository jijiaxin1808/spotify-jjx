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
import { getMeinfo } from '../utils/access'
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
    this.currtUser = getMeinfo().display_name
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
