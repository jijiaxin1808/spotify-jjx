<template>
  <div class="album-card"  @click="toAlbums(albumId)">
    <img :src="imgUrl" width="160px" height="160px"/>
    <div class="album-name">{{albumName}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getMeinfo } from '../utils/access'
import Search from './Search.vue'
@Component({
  components: {
    Search
  }
})
export default class Header extends Vue {
  @Prop() imgUrl!: string
  @Prop() albumName!: string
  @Prop() albumId!: string
  toAlbums (id: string) {
    this.$router.push({ path: `/albums/${id}` })
  }
}
</script>
<style lang="less" scoped>
.album-card {
  width: 160px;
  height: 200px;
  background: #393b40;
}
.album-name {
  padding-left: 5px;
  font-size: 12px;
}
</style>
