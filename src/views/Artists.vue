<template>
  <div>
    Artists
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  id!: string
  created () {
    this.id = this.$route.params.id
  }
}
</script>
