import Vue from 'vue'
import App from './App'


/**
 * 第二版本 （第三章 3-1组件化～3-3patch debugger测试）
 * 打断点的两个位置：断点1 return function patch (oldVnode, vnode, hydrating, removeOnly) { debugger...};
 *  断点2： function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {debugger....}
 *
 * 该入口文件为了测试 组件节点的 patch的过程，即vm.$mount的整个挂载流程，从vNode->真实的dom-->渲染到页面上的流程
 *  组件节点：类似于这样 render(h){return h(App)} App是一个组件
 */
// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
let app = new Vue({
  el: '#app',
  render(h){
    return h(App)
  }
})

