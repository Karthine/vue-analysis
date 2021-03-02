<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div ref="test">
      {{msg}}
    </div>
    <button @click="change" class="change">change</button>
    <button @click="change1" >change1</button>
  </div>
</template>

<script>

  export default {
  name: 'App',
  data(){
    return {
      flag:true,
      msg:'Hello World',

    }
  },
  methods:{
    /**
     * 点击change按钮，最终输出结果和顺序
     *  sync: Hello World
        nextTick: Hello Vue
        nextTick with promise: Hello Vue
     */
    change(){
      this.msg = 'Hello Vue'
      console.log('sync:' +this.$refs.test.innerHTML)
      this.$nextTick(()=>{
        console.log('nextTick:' +this.$refs.test.innerHTML)
      })
      this.$nextTick().then(()=>{
        console.log('nextTick with promise:' +this.$refs.test.innerHTML)
      })
    },

    /**
     * 点击change按钮，最终输出结果和顺序
     *  sync: Hello World
        nextTick: Hello World
        nextTick with promise: Hello Vue
     原因：如源码分析，nextTick是将所有的需要执行的函数依次全都收集起来放到callbacks数组中，在下一个Tick循环遍历callbacks，
          依次取出函数执行，如下：先放入this.$nextTick的匿名函数，然后再放入 this.msg = 'Hello Vue'的watcher的回调函数
          所以先输出 sync: Hello World，再输出nextTick: Hello World

     所以：【重要！！！】如果想拿到更新后的数据，nextTick一定要在数据改变之后在调用 如上面的change()方法中
          this.$nextTick()实际上调用的是vue源码中的src/core/util/next-tick.js文件中的nextTick()方法
     */
    change1(){
      this.$nextTick(()=>{
        console.log('nextTick:' +this.$refs.test.innerHTML)
      })
      this.msg = 'Hello Vue'
      console.log('sync:' +this.$refs.test.innerHTML)
      this.$nextTick().then(()=>{
        console.log('nextTick with promise:' +this.$refs.test.innerHTML)
      })
    },

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

.change{
  margin-right: 20px;
}
</style>
