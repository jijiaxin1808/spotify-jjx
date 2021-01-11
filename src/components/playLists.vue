<template>
  <div class="play-lists">
    <template v-for="playList in playLists">
      <div :key="playList.name" @click="toPlayList(playList.id)">{{playList.name}}</div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getMeinfo } from '../utils/access'
interface PlayList {
  id: string;
  name: string;
}

@Component
export default class PlayLists extends Vue {
  playLists = []
  created () {
    const id = getMeinfo().id
    this.$axios.get(`https://api.spotify.com/v1/users/${id}/playlists?limit=50`).then(res => {
      if (res.status === 200) {
        this.playLists = res.data.items.map((item: PlayList) => ({
          id: item.id,
          name: item.name
        }))
      }
    })
  }

  toPlayList (id) {
    console.log(id)
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
