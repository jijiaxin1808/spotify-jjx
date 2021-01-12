<template>
  <div>
    <div class="artists-info">
      <img :src="imgSrc" width="200px" height="200px"/>
      <div class="album-desc">
        artist
        <h1>{{artistName}}</h1>
        <div>{{followerTotal}} followers</div>
      </div>
    </div>
    <h1 style="margin-left: 20px">Popular tracks</h1>
    <Songs :songsData="songsData" :type="'artist'" />
    <div class="artist-albums">
      <div class="artist-album" v-for="album in albumsData" :key="album.id">
        <AlbumCard
          :key="album.id"
          :albumId="album.id"
          :albumName="album.name"
          :imgUrl="album.imgUrl" />
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Songs from '../components/Songs.vue'
import AlbumCard from '../components/AlbumCard.vue'
@Component({
  components: {
    Songs,
    AlbumCard
  }
})
export default class Login extends Vue {
  id!: string
  imgSrc = ''
  artistName=''
  followerTotal = 0
  songs = []
  albums = []
  created () {
    this.id = this.$route.params.id
    this.init()
    console.log(this.id)
  }

  @Watch('$route')
  init () {
    this.id = this.$route.params.id
    this.$axios.get(`https://api.spotify.com/v1/artists/${this.id}`).then(({ data }) => {
      this.followerTotal = data.followers.total
      this.imgSrc = data.images[0].url
      this.artistName = data.name
    })
    this.$axios.get(`https://api.spotify.com/v1/artists/${this.id}/albums?offset=0&limit=20&include_groups=album,single,compilation,appears_on&market=US`).then(({ data }) => {
      console.log(data)
      this.albums = data.items
    })
    this.$axios.get(`https://api.spotify.com/v1/artists/${this.id}/top-tracks?country=US`).then(({ data }) => {
      this.songs = data.tracks
    })
  }

  get songsData () {
    return this.songs.map((item: any) => ({
      name: item.name,
      id: item.id,
      time: item.duration_ms,
      albumName: item.album.name,
      albumId: item.album.id
    }))
  }

  get albumsData () {
    return this.albums.map((item: any) => ({
      name: item.name,
      id: item.id,
      imgUrl: item.images[0].url
    }))
  }
}
</script>
<style lang="less" scoped>
.artists-info {
  margin: 20px;
  display: flex;
}
.album-desc {
  padding: 0 10px;
}
.artist-albums {
  width: 1400px;
  display: flex;
  flex-wrap: wrap;
}
.artist-album {
  margin: 20px;
  cursor: pointer;
}
</style>
