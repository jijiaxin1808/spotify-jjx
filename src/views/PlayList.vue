<template>
  <div>
    Playlist
    <Songs :songsData="songsData"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Songs from '../components/Songs.vue'
@Component({
  components: {
    Songs
  }
})
export default class Playlist extends Vue {
  public id = ''
  public songsData = []
  created () {
    this.id = this.$route.params.id
    this.$axios.get(`https://api.spotify.com/v1/playlists/${this.id}/tracks?offset=0&limit=100`).then(res => {
      this.songsData = res.data.items
      console.log(res.data.items, this.songsData)
    })
  }
}
</script>
