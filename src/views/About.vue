<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Player />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Player from '@/components/Player.vue'
@Component({
  components: {
    Player
  }
})
export default class Home extends Vue {}
</script>
