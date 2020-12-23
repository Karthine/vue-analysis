import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 5-2-parse debugger
 * 断点位置：var createCompiler = createCompilerCreator(function baseCompile (template,options) { debugger var ast = parse(template.trim(), options);...}
 */
// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
new Vue({
  el: '#app',
  template:'<ul :class="bindCls" class="list" v-if="isShow">'+
      '<li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>'+
      '</ul>',
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


