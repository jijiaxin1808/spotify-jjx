<template>
  <a href="http://localhost:8888/login">login</a>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { setAccessToken } from '../utils/access'

@Component
export default class Login extends Vue {
  created () {
    const { code, state } = this.$route.query
    if (!code || !state) return
    this.$axios.post(`http://localhost:8888/callback?code=${code}&state=${state}`).then(res => {
      setAccessToken(res.data.data.access_token)
      this.$router.push('/')
    })
  }

  @Watch('$route', { deep: true })
  getToken () {
    console.log('route变化了')
  }

  private auth () {
    this.$axios({ url: 'http://localhost:8888/login', method: 'GET' })
  }
}
</script>
