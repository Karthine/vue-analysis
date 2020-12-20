<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div v-if="flag">
      {{msg}}
    </div>
    <div v-else>
      {{msg1}}
    </div>
    <button @click="change" class="change">change</button>
    <button @click="toggle">toggle</button>
  </div>
</template>

<script>
  /**
   * 依赖收集 debugger
   * 断点位置1: defineReactive()函数里面的     get: function reactiveGetter () {...debugger..}
   * 断点位置2：mountComponent()函数里面的new Watcher()上面加一个debugger
   * 断点位置3：updateComponent = function () {debugger  vm._update(vm._render(), hydrating);};
   *
   * 源码中的cleanupDeps()是为了该场景：
   *    如之前的源码分析，一旦data中的数据发生改变，就会触发渲染watcher更新，就会调用updateComponent()方法
   *    当点击toggle按钮的时候，将flag设置为了false,msg就不会渲染了，但是点击change按钮的时候
   *    改变的是msg的值，如果源码中不调用cleanupDeps()，就会导致也会触发updateComponent()，浪费资源
   *
   * cleanupDeps()：移除不需要的，但是已经存在的订阅
   *
   *
   * 派发更新 debuger
   * 断点位置：defineReactive()函数里面的   set: function reactiveSetter (newVal) {debugger...}
   *
   */

  export default {
  name: 'App',
  data(){
    return {
      flag:true,
      msg:'Hello World',
      msg1:'Hello Vue'
    }
  },
  methods:{
    change(){
      this.msg = Math.random()
    },
    toggle(){
      this.flag = !this.flag
    }
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
