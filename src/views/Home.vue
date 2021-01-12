<template>
<div>
  <Header />
  <div class="main-page">
    <PlayLists />
    <router-view />
  </div>
  <Player/>
</div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import PlayLists from '../components/playLists.vue'
import Player from '../components/Player.vue'
@Component({
  components: {
    Header,
    PlayLists,
    Player
  }
})
export default class Home extends Vue {
}
</script>
<style lang="less" scoped>
.main-page {
  display: flex;
  width: 100%;
}
</style>
