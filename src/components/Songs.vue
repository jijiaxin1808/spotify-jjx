<template>
  <div class="songs">
          <div>TRACK</div>
          <div>ARTIST</div>
          <div>TIME</div>
          <div>ALBUM</div>
          <div>ADDED</div>
    <template v-for="song in d">
      <div :key="song.id" class="song">
        <div @click="playMusic(song.id)">{{song.name}}</div>
        <div>
          artists
        <template v-for="artist in song.artists">
          <span @click="toArtists(artist.id)" :key="artist.id">{{artist.name}}</span>
        </template>
        </div>
        <div>{{handlePlayTime(song.time)}}</div>
        <div @click="toAlbums(song.albumId)">{{song.albumName}}</div>
        <div>{{handleTimeAgo(song.addedAt)}}</div>
      </div>

    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { handleTimeAgo, handlePlayTime } from '../utils/time'
@Component
export default class Songs extends Vue {
@Prop() songsData: any
// public d = []
created () {
  console.log('created')

  console.log(this.d, 'data')
}

handleTimeAgo = handleTimeAgo
handlePlayTime = handlePlayTime
get d () {
  return this.songsData.map((item: any) => ({
    addedAt: item.added_at,
    name: item.track.name,
    artists: item.track.artists,
    albumName: item.track.album.name,
    time: item.track.duration_ms,
    id: item.track.id,
    albumId: item.track.album.id
  }))
}

toArtists (id: string) {
  this.$router.push({ path: `/artists/${id}` })
}

toAlbums (id: string) {
  this.$router.push({ path: `/albums/${id}` })
}
}
</script>
<style lang="less" scoped>
.song {
  display: flex;
}
div {
  margin: 5px;
}
</style>
