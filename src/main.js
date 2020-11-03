import Vue from 'vue'
// import App from './App.vue'

/**
 *
 * 要结合vue-2.6.12工程，一起理解，vue-2.6.12工程中有注释
 */

var app = new Vue({
  el: '#app',

  render(createElement){
    return createElement('div',{
      // todo 如果这里写成app1会直接替换掉模板页面的index.html中 <div id="app"></div> ==>渲染成<div id="app1"></div>
      // todo 使用render函数就不会出现从插值表达式{{message}} => hello vue显示的一个过渡，会直接显示出来；之前的过渡是因为编译器需要将template编译成render函数需要时间
      attrs:{
        id:'app1'
      }
    },this.message)
  },
  // todo 上面的也可以简写成 下面的，es6尖头函数
  // 这种简写方式不能访问到this.message
  // render: h => h('div',{attrs:{id:'app1'}},'测试'),
  mounted(){
    // todo 为什么 这里的this.message可以直接访问到 data中的message
    // new Vue(..)--->调用Vue.prototype._init()中 ---> initState() ————》
    // 通过proxy代理，Object.definedPorperty，访问this.message实际上访问的是this._data.message
    console.log(this.message)
  },
  data(){
    return {
      message: 'Hello Vue'
    }
  }
})
