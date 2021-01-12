<template>
  <div class="songs">
    <div class="title">
      <div class="track">TRACK</div>
      <div class="artist">ARTIST</div>
      <div class="time">TIME</div>
      <div class="album">ALBUM</div>
      <div class="added">ADDED</div>
    </div>

    <template v-for="song in d">
      <div :key="song.id" class="song">
        <div class="track" @click="playMusic(song.id)">{{song.name}}</div>
        <div class="artist">
        <template v-for="artist in song.artists">
          <span @click="toArtists(artist.id)" :key="artist.id">{{artist.name}}</span>
        </template>
        </div>
        <div class="time">{{handlePlayTime(song.time)}}</div>
        <div class="album" @click="toAlbums(song.albumId)">{{song.albumName}}</div>
        <div class="added">{{handleTimeAgo(song.addedAt)}}</div>
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
  // console.log('created')

  // console.log(this.d, 'data')
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
  margin: 10px;
  display: flex;
  div {
    margin: 10px;
  }
  .track.artist.album {
    color: red;

  }
}

.songs {
  width: 1400px;
}

.title {
  margin: 10px;
  display: flex;
  div {
    margin: 10px;
  }
}
.track {
  width: 400px;
}
.artist {
  width: 150px;
      &:hover {
    text-decoration: underline;
  }
}
.time {
  width: 100px;
}
.album {
  width: 400px;
      &:hover {
    text-decoration: underline;
  }
}
.added {
  width: 100px;
}
</style>
