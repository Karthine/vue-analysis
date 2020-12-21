import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
// todo 其实编译过程和App.vue文件没啥关系，因为App.vue在离线的过程中就已经被vue-loader编译成了render函数
// todo 查看编译的过程主要是看new Vue({...template:'<App/>'} 中的template怎么转换成render函数
// todo 断点位置：Vue.prototype.$mount(){....debugger var ref = compileToFunctions(....)}
new Vue({
  el: '#app',
  components:{App},
  template:'<App/>'
})

