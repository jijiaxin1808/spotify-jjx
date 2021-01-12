<template>
  <div class="songs">
    <div class="title">
      <div class="track">TRACK</div>
      <div class="artists" v-if="isPlaylist">ARTIST</div>
      <div class="time">TIME</div>
      <div class="album" v-if="isPlaylist || isArtist">ALBUM</div>
      <div class="added" v-if="isPlaylist">ADDED</div>
    </div>
    <template v-for="song in songsData">
      <div :key="song.id" class="song">
        <div class="track" @click="playMusic(song.id)">{{song.name}}</div>
        <div class="artists" v-if="isPlaylist">
        <template v-for="artist in song.artists">
          <span class="artist"  @click="toArtists(artist.id)" :key="artist.id">{{artist.name}}</span>
        </template>
        </div>
        <div class="time">{{handlePlayTime(song.time)}}</div>
        <div class="album" v-if="isPlaylist || isArtist" @click="toAlbums(song.albumId)">{{song.albumName}}</div>
        <div class="added" v-if="isPlaylist">{{handleTimeAgo(song.addedAt)}}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { handleTimeAgo, handlePlayTime } from '../utils/time'
enum songsType {
  playlist = 'playlist',
  init = '',
  albums = 'albums'
}
@Component
export default class Songs extends Vue {
@Prop() songsData: any

handleTimeAgo = handleTimeAgo
handlePlayTime = handlePlayTime
@Prop() type!: string
toArtists (id: string) {
  this.$router.push({ path: `/artists/${id}` })
}

toAlbums (id: string) {
  this.$router.push({ path: `/albums/${id}` })
}

get isPlaylist () {
  return this.type === 'playlist'
}

get isAlbums () {
  return this.type === 'albums'
}

get isArtist () {
  return this.type === 'artist'
}
}

</script>
<style lang="less" scoped>
.song {
  border-top: 1px solid #393b40;
  margin: 10px 20px 0 20px;
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
  margin: 0 20px;
  display: flex;
  font-size: 14px;
  color: #393b40;
  div {
    margin: 10px;
  }
}
.track {
  width: 400px;
}
.artists {
  width: 150px;
  .artist {
    margin-right: 5px;
    display: block;
    &:hover {
      text-decoration: underline;
    }
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
