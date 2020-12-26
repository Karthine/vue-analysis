import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-4-slot-普通插槽
 *  断点位置
 *      1、 function processSlotOutlet (el) { debugger...}
 *      2、 genData(...debugger if (el.slotTarget && !el.slotScope) {}...)
 *      3、 function genSlot (el, state) {debugger...}
 *      4、 最终生成代码的地方    createCompilerCreator(){ var code = generate(ast, options); debugger...}
 *
 *  vm.$slots的值 是在 src/core/instance/render.js中的initRender()里面进行了赋值：
 *      vm.$slots = resolveSlots(options._renderChildren, renderContext)
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
// 子组件
// with(this){
//   return_c('div',
//       {
//         staticClass: "container"
//       },
//       [
//         _c('header',
//             [
//               _t("header")
//             ],
//             2),
//         _c('main',
//             [
//               _t("default",
//                   [
//                     _v("默认内容")
//                   ])
//             ],
//             2),
//         _c('footer',
//             [
//               _t("footer")
//             ],
//             2)
//       ])
// }
