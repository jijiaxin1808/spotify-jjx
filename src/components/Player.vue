<template>
  <div class="hello">
      <div>这里是一个player</div>
      <button @click="getVol"> get vol</button>
      <button @click="getState"> get State</button>
      <button @click="setPosition">set position</button>
      <button @click="load">load</button>
      <input v-model.number="position" />
      <div>{{loaded}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getAccessToken } from '../utils/access'
interface PlayerResponce {
  device_id: string;
}
interface SpotifyPlyer {
  getVolume: () => {};
}
@Component
export default class Player extends Vue {
  public player: any = null;
  public loaded = false;
  public name = '111'
  public position = 0
  @Prop() private playerName = 'spotify@jjxweb'
  created () {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = getAccessToken()
      this.player = new window.Spotify.Player({
        name: this.playerName,
        getOAuthToken: (cb: any) => { cb(token) },
        volume: 0.5
      })
      this.loaded = true
      console.log(this.loaded, 'loaddone')
      this.player.addListener('ready', (res: PlayerResponce) => {
        const { device_id: deviceId } = res
        const spotifyUrl = 'spotify:track:2ksFoEsRPJ7R25j4VDGSeV'
        fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotifyUrl] }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
      })
      this.player.connect()
    }
  }

  getState () {
    if (!this.loaded) return null
    this.player.getCurrentState().then((state: any) => {
      console.log(state)
    })
  }

  getVol () {
    if (!this.loaded) return null
    this.player.getVolume().then((volume: number) => {
      const volPercentage = volume * 100
      console.log(`The volume of the player is ${volPercentage}%`)
    }).catch((err: any) => console.log(err))
  }

  load () {
    this.loaded = !this.loaded
  }

  setPosition () {
    console.log(this.position)
    this.player.seek(this.position * 1000)
  }
}
</script>
