/* eslint-disable @typescript-eslint/camelcase */
<template>
  <div class="hello">
      <div>这里是callback</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { setAccessToken, getAccessToken } from '../utils/access'
@Component
export default class HelloWorld extends Vue {
  created () {
    const { code, state } = this.$route.query
    if (!state || !code) {
      this.$router.push('/')
    }
    this.$axios.post(`http://localhost:8888/callback?code=${code}&state=${state}`).then(res => {
      console.log(res.data.data)
      setAccessToken(res.data.data.access_token)
    })
    this.$axios({ url: 'https://api.spotify.com/v1/me', method: 'get', headers: { Authorization: 'Bearer ' + getAccessToken() } }).then(res => {
      console.log(res.data)
    })
  }
}
</script>
