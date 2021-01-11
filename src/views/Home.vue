<template>
  <Header />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class Login extends Vue {
  constructor () {
    super()
    console.log('kkx')
  }
}
</script>
