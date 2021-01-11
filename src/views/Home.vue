<template>
<div>
  <Header />
  <PlayLists />
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
export default class Login extends Vue {
  constructor () {
    super()
    console.log('kkx')
  }
}
</script>
