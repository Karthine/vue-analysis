<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div>
      {{msg}}
    </div>
    <ul>
      <li v-for="item in items">{{item}}</li>
    </ul>
    <button @click="add" class="change">add</button>
    <button @click="change" >change</button>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
  name: 'App',
  data(){
    return {
      msg:{
        a:'Hello'
      },
      items:[1,2]

    }
  },
  methods:{
    add(){
      //以下两句都不能触发set()方法，故页面不会更新
      // this.msg.b = 'Vue'
      // this.items[2] = 4

      //修改为：
      Vue.set(this.msg,'b','Vue')
      // 调用数组的方法
      this.items.push(4)


    },
    change(){
      // 直接操作数组的下标不会触发set()方法
      // this.items[1] = 3
      Vue.set(this.items,1,888)
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
