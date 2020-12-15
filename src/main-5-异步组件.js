import Vue from 'vue'
import App from './App'

/**
 *  第五版本 （第三章 3-7异步组件 debugger调试）
 *  断点：源码中resolveAsyncComponent()方法中
 */
// 1、工厂函数方式加载
// Vue.component('HelloWorld',function (resolve,reject) {
//   // 这个特殊的 语法告诉 webpack 自动将编译后的代码分割成不同的块
//   require(['./components/HelloWorld.vue'],function (res) {
//     resolve(res)
//   })
//
// })

// 2、Promise方式加载 最常用的一种方式
// Vue.component('HelloWorld',
    //       // 该import函数返回一个Promise对象，这个import是webpack的import
//     () => import('./components/HelloWorld.vue')
//   )

// 3、高级异步组件方式加载：
const LoadingComp = {
  template: '<div>loading</div>'
}
const ErrorComp = {
  template: '<div>error</div>'
}
const AsyncComp = () => ({
  //需要加载的组件。应当是一个Promise
  compontent: import('./components/HelloWorld.vue'),
  //加载中应当渲染的组件
  loading: LoadingComp,
  //出错时渲染的组件
  error: ErrorComp,
  //渲染加载中组件前的等待时间，默认200ms
  delay:200,
  //最长等待时间，超出此时间则渲染错误组件，默认Infinity
  timeout:1000

})

Vue.component('HelloWorld', AsyncComp)

// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
let app = new Vue({
  el: '#app',
  render(h){
    return h(App)
  }
})

