import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-1-event debugger
 * 断点位置： function generate (ast,options) { debugger var state = new CodegenState(options);...)
 * todo 整个流程：
 *  1、先将模板编译成代码 (ast节点【会用到processAttrs（）】 -->ast树-->optimize ast树 -->codegen成代码)
 *    断点位置：  function processAttrs (el) { debugger var list = el.attrsList...}
 *  2、添加事件   【会调用genHandlers(),updateListeners()【src/core/vdom/helpers/update-listeners.js中】】
 *    断点位置：   function updateDOMListeners (oldVnode, vnode) {debugger  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {return}..
 *              Vue.prototype.$emit()方法里面也要打
 */
let Child = {
  template: '<button @click="clickHandler($event)">' +
      'click me' +
      '</button>',
  methods:{
    clickHandler(e){
      console.log('Button clicked!', e)
      this.$emit('select')
    }
  }
}
new Vue({
  el: '#app',
  template: '<div>' +
      '<Child @select="selectHandler" @click.native.prevent="clickHandler"></Child>' +
      '</div>',
  data(){
    return {

    }
  },
  components:{
    Child
  },
  methods:{
    clickHandler(){
        console.log('Child clicked!')
    },
    selectHandler(){
      console.log('Child select!')
    }
  }
})


