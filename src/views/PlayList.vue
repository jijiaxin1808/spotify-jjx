<template>
  <div>
    <div class="playlist-info">
      <img :src="imgSrc" width="200px" height="200px"/>
      <div class="playlist-desc">
        playList
        <h1>{{name}}</h1>
        <p>{{desc}}</p>
        <div>{{total}} followers</div>
      </div>
      <div>Created by:  <span @click="toUser(creatorId)" class="user-link">{{creator}}</span> .{{totalSongs}} songs</div>
    </div>
    <Songs :songsData="songsData"/>
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
export default class Playlist extends Vue {
  public id = ''
  public songsData = []
  imgSrc = ''
  name = ''
  desc = ''
  total = 0
  totalSongs = 0
  creator = ''
  creatorId = ''
  created () {
    this.init()
  }

  @Watch('$route')
  init () {
    this.id = this.$route.params.id
    this.$axios.get(`https://api.spotify.com/v1/playlists/${this.id}/tracks?offset=0&limit=100`).then(res => {
      this.songsData = res.data.items
      this.totalSongs = this.songsData.length
      // console.log(res.data.items, this.songsData)
    })
    this.$axios.get(`https://api.spotify.com/v1/users/spotify/playlists/${this.id}`).then(res => {
      // console.log(res)
      this.desc = res.data.description
      this.name = res.data.name
      this.total = res.data.followers.total
      this.imgSrc = res.data.images[0].url
      this.creator = res.data.owner.display_name
      this.creatorId = res.data.owner.id
    })
  }

  toUser (id: string) {
    this.$router.push({ path: `/user/${id}` })
  }
}
</script>
<style lang="less">
.playlist-info  {
  display: flex;
  margin: 20px;
}
.playlist-desc {
  margin-left: 20px;
  color: #88898c;
}
.user-link {
  color: white;
}
</style>
