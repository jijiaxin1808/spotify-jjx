<template>
<div>
  <Header />
  <div class="main-page">
  <PlayLists />
  <router-view />
    </div>
</div>

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import PlayLists from '../components/playLists.vue'
@Component({
  components: {
    Header,
    PlayLists
  }
})
export default class Home extends Vue {
}
</script>
<style lang="less" scoped>
.main-page {
  display: flex;
  width: 100%;
}
</style>
