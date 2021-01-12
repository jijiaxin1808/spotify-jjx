<template>
  <div>
    <div class="album-info">
      <img :src="imgSrc" width="200px" height="200px"/>
      <div class="playlist-desc">
        album
        <h1>{{albumName}}</h1>
      </div>
      <div>Created by:  <span @click="toUser(artistID)" class="user-link">{{artistName}}</span> .{{totalSongs}} songs</div>
    </div>
    <Songs :songsData="songsData" :type="'albums'"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Songs from '../components/Songs.vue'
@Component({
  components: {
    Songs
  }
})
export default class Albums extends Vue {
  id!: string
  albumName = ''
  artistName = ''
  artistID = ''
  songs = []
  imgSrc = ''
  totalSongs = 0
  created () {
    this.init()
  }

  @Watch('$route')
  init () {
    this.id = this.$route.params.id
    this.$axios.get(`https://api.spotify.com/v1/albums/${this.id}`).then(({ data }) => {
      // console.log(res.data)
      this.imgSrc = data.images[0].url
      this.albumName = data.name
      this.totalSongs = data.total_tracks
      this.artistName = data.artists[0].name
      this.artistID = data.artists[0].id
    })
    this.$axios.get(`https://api.spotify.com/v1/albums/${this.id}/tracks`).then(res => {
      this.songs = res.data.items
    })
  }

  get songsData () {
    return this.songs.map((item: any) => ({
      name: item.name,
      id: item.id,
      time: item.duration_ms
    }))
  }

  toUser (id: string) {
    this.$router.push({ path: `/user/${id}` })
  }
}
</script>
