import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-7-keep-alive
 * 输出结果：
 *   Comp A mounted
 *   Comp A activated
 *
 * 点击switch按钮，输出：
 *   Comp A deactivated
 *   Comp B mounted
 *   Comp B activated
 *
 * 再点击switch按钮，输出：
 *   Comp B deactivated
 *   Comp A activated
 *
 * 再点击switch按钮，输出：
 *   Comp A deactivated
 *   Comp B activated
 * ....
 *
 * todo mounted方法只调用了一次 表明：使用了keep-alive组件之后，组件A被缓存到了页面上，点击switch按钮，没有
 *      对组件A进行销毁，而是被缓存到内存中，在从组件B切回到组件A的时候，从内存中取出组件A，并渲染到页面上，
 *      同理，B组件切换的时候也是这样
 *
 * keep-alive的源码在：
 *    src/core/components/keep-alive.js中
 * keep-alive组件 在使用之前需要先注册，那么keep-alive组件是什么时候注册的呢？
 *    在src/core/global-api/index.js中 initGlobalAPI()函数中 的 extend(Vue.options.components, builtInComponents)
 *    extend(Vue.options.components, builtInComponents) 将内置组件KeepAlive扩展到Vue上，故全局都可以使用
 *
 *
 * 断点位置：
 *    渲染的时候
 *      1、 var KeepAlive = {.....render: function render () {debugger}..}
 *    patch到dom上的时候
 *      2、 return function patch (oldVnode, vnode, hydrating, removeOnly) {debugger...}
 *      3、 function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {...if (isDef(i = i.hook) && isDef(i = i.init)) {debugger i(vnode, false }}
 *      4、 function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {... if (isDef(vnode.componentInstance)) {debugger...}
 *    钩子函数上加断点：
 *        var componentVNodeHooks = {
 *           init: function init (vnode, hydrating) { debugger...}
 *          prepatch: function prepatch (oldVnode, vnode) {debugger...}
 *          insert: function insert (vnode) {debugger...}
 **/

let A = {
  template: '<div class="a">' +
      '<p>A Comp</p>' +
      '</div>',
  name: 'A',
  mounted(){
    console.log('Comp A mounted')
  },
  activated(){
    console.log('Comp A activated')
  },
  deactivated(){
    console.log('Comp A deactivated')
  }
}

let B = {
  template: '<div class="b">' +
      '<p>B Comp</p>' +
      '</div>',
  name: 'B',
  mounted(){
    console.log('Comp B mounted')
  },
  activated(){
    console.log('Comp B activated')
  },
  deactivated(){
    console.log('Comp B deactivated')
  }
}


let vm = new Vue({
  el: '#app',
  template: '<div>' +
      '<keep-alive>' +
      '<component :is="currentComp">' +
      '</component>' +
      '</keep-alive>' +
      '<button @click="change">switch</button>' +
      '</div>',
  data(){
    return {
      currentComp:'A'
    }
  },
  components:{
    A,
    B
  },
  methods:{
    change(){
      this.currentComp = this.currentComp === 'A' ? 'B' : 'A'
    }
  }
})
