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
      //以下两句都不能触发setter()方法，故页面不会更新
      // 对于使用 Object.defineProperty 实现响应式的对象，当我们去给这个对象添加一个新的属性的时候，是不能够触发它的 setter 的
      // 也就是this.msg.b不是响应式的数据
      // this.msg.b = 'Vue'
      // this.items[2] = 4

      //修改为：
      Vue.set(this.msg,'b','Vue')
      // Vue.set() 是通过 defineReactive(ob.value, key, val) 把新添加的属性变成响应式对象，然后再通过 ob.dep.notify() 手动的触发依赖通知


      // 调用数组的方法
      /**
       * Vue中的数组方法首先继承了 Array，然后对数组中所有能改变数组自身的方法，
       * 如 push、pop 等这些方法进行重写。重写后的方法会先执行它们本身原有的逻辑，
       * 并对能增加数组长度的 3 个方法 push、unshift、splice 方法做了判断，获取到插入的值，
       * 然后把新添加的值变成一个响应式对象，并且再调用 ob.dep.notify() 手动触发依赖通知。
       *
       * 源码定义在src/core/observer/array.js
       */
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
