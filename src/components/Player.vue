<template>
  <div class="hello">
      <div>这里是一个player</div>
      <button @click="getVol"> get vol</button>
      <button @click="getState"> get State</button>
      <button @click="setPosition">set position</button>
      <button @click="handlePlayBar">handlePlayBar</button>
      <input v-model.number="position" />
      <input type="range" v-model.number="volume"/>
      <input type="range" v-model.number="userPosition"/>
      <div>{{loaded}}</div>
      <div ref="bar" class="play-bar">
        <div class="left-bar">
          <div class="now-paly">
            <img src="https://i.scdn.co/image/ab67616d0000b273102e88057f9ee21ec54b8634" height="56px" width="56px" />
            <img ref="extendImg" class='extend-img' src="https://i.scdn.co/image/ab67616d0000b273102e88057f9ee21ec54b8634"  width="232px" />
            <button @click="extend" class="extend-btn">
              <svg height="24" role="img" width="24" viewBox="0 0 24 24" class="now-play-svg"><polygon points="15.54,21.151 5.095,12.229 15.54,3.309 16.19,4.069 6.635,12.229 16.19,20.39 "></polygon></svg>
            </button>
          </div>
        </div>
        <div class="mid-bar">
          <button @click="handlePlayBtn">{{playBenText}}</button>
          <div>{{handlePlayTime(position)}}</div>
          <div>{{handlePlayTime(duration)}}</div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getAccessToken } from '../utils/access'
import { debounce } from '../utils/debounce'
import { handlePlayTime } from '../utils/index'
interface PlayerResponce {
  device_id: string;
}
interface SpotifyPlyer {
  getVolume: () => {};
}
interface StyleElement extends Element {
  style: any;
}

@Component
export default class Player extends Vue {
  public player: any = null;
  public loaded = false;
  public name = '111'
  public volume = 50
  public position = 0;
  public duration = 0;
  public userPosition = 0;
  handlePlayTime = handlePlayTime
  get playBenText () {
    return this.paused ? '播放' : '暂停'
  }

  paused = false
  @Prop() private playerName = 'spotify@jjxweb'
  created () {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = getAccessToken()
      this.player = new window.Spotify.Player({
        name: this.playerName,
        getOAuthToken: (cb: any) => { cb(token) },
        volume: this.volume * 0.01
      })
      this.loaded = true
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
        }).then(() => {
          setInterval(() => {
            this.getState()
          }, 1000)
        })
      })
      this.player.connect()
    }
  }

  getState () {
    if (!this.loaded) return null
    this.player.getCurrentState().then((state: any) => {
      console.log(state)
      if (!state) return

      this.paused = state.paused
      this.position = state.position
      this.duration = state.duration
    })
  }

  getVol () {
    if (!this.loaded) return null
    this.player.getVolume().then((volume: number) => {
      const volPercentage = volume * 100
      console.log(`The volume of the player is ${volPercentage}%`)
    }).catch((err: any) => console.log(err))
  }

  @Watch('userPosition')
  setPosition () {
    console.log(this.userPosition * this.duration * 0.01)
    this.player.seek(this.userPosition * this.duration * 0.01)
  }

  debouncedSetvol = debounce((player, volume) => {
    if (!player) return null
    console.log(player)
    player.setVolume(volume * 0.01)
  }, 500)

  @Watch('volume')
  setVol () {
    this.debouncedSetvol(this.player, this.volume)
  }

  handlePlayBar () {
    const playBar = this.$refs.bar as StyleElement
    console.log(playBar)
    playBar.addEventListener('click', function (e) {
      console.log(e)
    })
  }

  extend () {
    const extendImg = this.$refs.extendImg as StyleElement
    console.log(extendImg.clientHeight)
    if (!extendImg.clientHeight) {
      extendImg.style.display = 'block'
      requestAnimationFrame(() => {
        extendImg.style.height = '232px'
      })
    } else {
      requestAnimationFrame(() => {
        extendImg.style.height = '0'
        extendImg.style.display = 'none'
      })
    }
  }

  handlePlayBtn () {
    if (this.paused) {
      this.resume()
    } else {
      this.pause()
    }
  }

  pause () {
    this.player.pause().then(() => {
      console.log('Paused!')
      this.paused = true
    })
  }

  resume () {
    this.player.resume().then(() => {
      console.log('resume!')
      this.paused = false
    })
  }
}
</script>

<style lang="less" scoped>
.play-bar {
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #282828;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
.left-bar {
  display: flex;
  width: 510px;
  height: 56px;
}
.now-paly {
  display: flex;
  position: relative;
  &:hover {
    .extend-btn {
      opacity: 1;
    }
  }
}
.extend-btn {
  opacity: 0;
  transition-duration: 100ms;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #000000b3;
  outline: none;
  border-radius: 500px;
  border-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  &:hover {
    transform: scale(1.1);
  }
}
.now-play-svg {
  transform: rotate(90deg);
  color: #b3b3b3;
  // outline-style: none;
  fill: currentColor;
  &:hover {
    color: #fff;
  }
}
.extend-img {
  position: fixed;
  bottom: 90px;
  left: 0;
  height: 0;
  transition: 150ms;
}
</style>
