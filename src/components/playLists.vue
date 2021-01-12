<template>
  <div class="play-lists">
    <template v-for="playList in playLists">
      <div class="play-list" :key="playList.name" @click="toPlayList(playList.id)">{{playList.name}}</div>
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

  toPlayList (id: string) {
    this.$router.push({ path: `/playlist/${id}` })
  }
}
</script>
<style lang="less" scoped>
.play-lists {
  width: 250px;
  height: 800px;
  overflow: auto;
  background-color: #222326;
}
div {
  color: white;
}
.play-list {
  width:250px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  cursor: pointer;
  margin: 5px 0;
}
</style>
