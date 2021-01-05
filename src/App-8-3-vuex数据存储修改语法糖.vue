<template>
  <div id="app">
    <h1>Hello App!</h1>
    <div>root state count: {{count}}</div>
    <div>root getter computedCount: {{computedCount}}</div>
    <div>module A state count: {{aCount}}</div>
    <div>module A getter computedCount: {{aComputedCount}}</div>
    <div @click="increment">root mutation increment</div>
    <div @click="incrementAct">root action increment</div>
    <div @click="aIncrement">module A mutation increment</div>
    <div @click="aIncrementArc">module A action increment</div>
  </div>
</template>

<script>
  /**
   * App-8-3-vuex数据存储/修改 语法糖
   * mapState()，mapGetters(),mapMutations(),mapActions()的源码都定义在src/helpers.js中
   */
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    name: 'App',
    computed:{
      ...mapState([
          'count'
      ]),
      ...mapGetters([
         'computedCount'
      ]),
      ...mapState('a',{
        aCount: 'count'
      }),
      // 最终会找到 a/computedCount
      ...mapGetters('a',{
        aComputedCount: 'computedCount'
      }),
    },
    methods:{
      ...mapMutations([
        'increment'
      ]),
      ...mapActions({
        incrementAct: 'increment'
      }),
      ...mapMutations('a',{
        aIncrement: 'increment'
      }),
      ...mapActions('a',{
        aIncrementArc: 'increment'
      })
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
