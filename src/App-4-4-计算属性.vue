<template>
  <div id="app">
    <img src="./assets/logo.png" alt="">
    <div>
      {{name}}
    </div>
    <button @click="change" class="change">change</button>
    <button @click="changeLast">change last name</button>
  </div>
</template>

<!--
  todo 总结：
   computed是一个计算属性,类似于过滤器,对绑定到view的数据进行处理，
   计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。它用来监控自己定义的变量，
   该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理。


-->
<script>
  export default {
  name: 'App',
  data(){
    return {
      firstName: 'Yi',
      lastName: 'Huang',
      useless: 0

    }
  },
  computed:{
    name(){
      if (this.useless > 0) {
        return this.firstName + ',' + this.lastName
      }
      return 'please click change'
    }
  },
  methods:{
    change(){
      this.useless++
    },
    changeLast(){
      this.lastName = 'Zhang'
    }
  }

    // watch:{
    //   useless(newVal){
    //     console.log(newVal)
    //   }
    // },


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
