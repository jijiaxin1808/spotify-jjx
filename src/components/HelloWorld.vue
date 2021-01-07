<template>
  <div class="hello">
      <button @click="auth">jjx sb</button>
      <a href="http://localhost:8888/login">login</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class HelloWorld extends Vue {
  constructor () {
    super()
    console.log('kkx')
  }

  @Prop() private msg!: string;
  // $axios: any;
  private auth () {
    this.$axios({ url: 'http://localhost:8888/login', method: 'GET' })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
