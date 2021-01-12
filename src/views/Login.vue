<template>
  <a href="http://localhost:8888/login">login</a>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { setAccessToken, setMeInfo } from '../utils/access'

@Component
export default class Login extends Vue {
  created () {
    const { code, state } = this.$route.query
    if (!code || !state) return
    this.$axios.post(`http://localhost:8888/callback?code=${code}&state=${state}`).then(res => {
      setAccessToken(res.data.access_token)
      this.$axios.get('https://api.spotify.com/v1/me').then(res => {
        if (res.status === 200) {
          setMeInfo(res.data)
          this.$router.push('/')
        }
      })
    })
  }

  @Watch('$route', { deep: true })
  getToken () {
    // console.log('route变化了')
  }

  private auth () {
    this.$axios({ url: 'http://localhost:8888/login', method: 'GET' })
  }
}
</script>
