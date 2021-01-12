<template>
  <div ref='progressBar' class="bar">
      <div v-if="isShowInfo" class='bar-info'>{{currpositionText}}</div>
      <div class="progress-bar-warpper">
          <div ref="currtBar" class="currt-bar"></div>
      </div>
      <div v-if="isShowInfo" class="bar-info">{{durationText}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { handlePlayTime } from '../utils/time'
interface ElEvent extends Event {
  clientY?: number;
  clientX?: number;
}
interface ElElement extends Element {
  offsetLeft: number;
  style: any;
}

@Component
export default class ProgressBar extends Vue {
  @Prop()private onChange!: Function;
  @Prop()private initPosition!: number;
  @Prop() position!: number; // 是一个0-1之间的数字
  @Prop() isShowInfo!: boolean;
  @Prop() currposition!: number; // 当前text展示的
  @Prop() duration!: number;
  @Prop() infoType!: string
  public currDom!: ElElement
  mounted () {
    const el = this.$refs.progressBar as ElElement
    el.addEventListener('click', (e: ElEvent) => {
      if (e) {
        if (e.clientX) {
          const position = (e.clientX - el.offsetLeft) / el.clientWidth
          const currel = this.$refs.currtBar as ElElement
          this.cb(position)
          currel.style.transform = `translateX(-${(1 - position) * 100}%)`
        }
      }
    })
  }

  @Watch('position')
  updateUI () {
    if (!this.currDom) {
      this.currDom = this.$refs.currtBar as ElElement
    }
    this.currDom.style.transform = `translateX(-${(1 - this.position) * 100}%)`
  }

  cb (position: number) {
    // console.log('positionchange')
    this.onChange(position)
  }

  get currpositionText () {
    if (!this.infoType || !this.currposition) return ''
    if (this.infoType === 'time') return handlePlayTime(this.currposition)
    else return this.currposition
  }

  get durationText () {
    if (!this.infoType || !this.duration) return ''
    if (this.infoType === 'time') return handlePlayTime(this.duration)
    else return this.duration
  }
}

</script>
<style lang="less" scoped>
.progress-bar-warpper {
  width: 500px;
  height: 4px;
  background-color: #535353;
  border-radius:  2px;
  overflow: hidden;
}

.currt-bar {
  width: 100%;
  height: 4px;
  background-color: #b3b3b3;
  border-radius:  2px;
  // transform: translateX(-100%);
}

.bar {
  display: flex;
  align-items: center;
  height: 10px;
  &:hover {
    .currt-bar {
      background-color: #1db954;
    }
  }
}
.bar-info {
  min-width: 40px;
  font-size: 11px;
  color: #b3b3b3;
}
</style>
