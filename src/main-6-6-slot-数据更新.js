import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-6-slot-数据更新
 *  断点位置
 *      1、 function processSlotOutlet (el) { debugger...}
 *      2、 genData(...debugger if (el.slotTarget && !el.slotScope) {}...)
 *      3、 function genSlot (el, state) {debugger...}
 *      4、 最终生成代码的地方    createCompilerCreator(){ var code = generate(ast, options); debugger...}
 *  问题
 *    vue是数据驱动的，只有更新对应的组件的时候，对应的组件才会重新渲染，
 *    那为啥在父组件里面更新title的值，会触发子组件的重新渲染呢？也就是本章的数据更新的内容
 *    源码的位置是在：src/core/instance/lifecycle.js中的
 *        if (needsForceUpdate) {
              vm.$slots = resolveSlots(renderChildren, parentVnode.context)
             vm.$forceUpdate()
          }
      vm.$forceUpdate()强制更新，触发了页面的渲染

 02：26：30~02:31:55   数据更新
 *
 */

let AppLayout = {
  template: '<div class="container">' +
      '<header><slot name="header"></slot></header>'+
      '<main><slot>默认内容</slot></main>' +
      '<footer><slot name="footer"></slot></footer>' +
      '</div>',

}


let vm = new Vue({
  el: '#app',
  template: '<div>' +
      '<app-layout>' +
      '<h1 slot="header">{{title}}</h1>' +
      '<p>{{msg}}</p>' +
      '<p slot="footer">{{desc}}</p>' +
      '</app-layout>' +
      '<button @click="change">change title</button>' +
      '</div>',
  data(){
    return {
      title: '我是标题',
      msg: '我是内容',
      desc: '其他信息',
    }

  },
  components:{
    AppLayout
  },
  methods:{
    change(){
      this.title="我是新标题"
    }
  }
})

// 最终codegen生成的代码
// 父组件：
// with(this){
//   return_c('div',
//       [
//         _c('app-layout',
//             [
//               _c('h1',
//                   {
//                     attrs: {
//                       "slot": "header"
//                     },
//                     slot: "header"
//                   },
//                   [
//                     _v(_s(title))
//                   ]),
//               _c('p',
//                   [
//                     _v(_s(msg))
//                   ]),
//               _c('p',
//                   {
//                     attrs: {
//                       "slot": "footer"
//                     },
//                     slot: "footer"
//                   },
//                   [
//                     _v(_s(desc))
//                   ])
//             ])
//       ],
//       1)
// }
