import Vue from 'vue'
// import App from './App.vue'


var app = new Vue({
  el: '#app',
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
