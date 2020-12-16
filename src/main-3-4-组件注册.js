import Vue from 'vue'
import App from './App'

/**
 *  第四版本 （第三章 3-6组件注册 debugger调试）
 */

// todo 为了演示全局注册而这样写
// 全局注册是将当前注册的组件的的options 合并到Vue.options上，任意地方都可以使用
// 全局注册的源码是在 src/core/global-api/assets.js中定义的
// ASSET_TYPES定义在src/shared/constants
Vue.component('app',App)

// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
let app = new Vue({
  el: '#app',
  template:'<app></app>'
})

// 局部注册
// new Vue({
//   el: '#app',
//   components:{App},
//   template:'<App/>'
// })
