import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 5-3-optimize debugger
 * 断点位置：var createCompiler = createCompilerCreator(function baseCompile (template,options) {....debugger optimize(ast, options);...}
 */
// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
new Vue({
  el: '#app',
  template:'<div><ul :class="bindCls" class="list" v-if="isShow">'+
      '<li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>'+
      '</ul><div><p>111</p></div><p>222</p></div>',
  data(){
    return {
      bindCls:'a',
      isShow:true,
      data:['A','B','C','D']
    }
  },
  methods:{
    clickItem(index){
      console.log(index)

    }
  }
})


