import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-2-v-model-表单 debugger
 * v-model整体的分析
 *    1、编译阶段 parse genDefaultModel()
 *    2、运行时 断点位置： function _update (oldVnode, vnode) {debugger...}
 */

new Vue({
  el: '#app',
  template: '<div>' +
      '<p>Message is: {{message}}</p>' +
      '<input v-model="message" placeholder="edit me">' +
      '</div>',
  data(){
    return {
      message:''
    }
  },
  methods:{
  }
})

/**
 *  todo v-model其实是一个语法糖，他的本质如下：给input添加一个value的prop,他的值指向message,以及添加一个事件处理函数
 *  todo 双向数据的绑定的原理：
 *     input的value的值指向message了，所以message的改变会导致input的值的变化；
 *     在input(输入框)输入东西的时候，会触发input事件，因为input事件的回调函数是：message=$event.target.value，故同时会改变message的值
 *
 *  回忆之前的一道面试题：【契约锁】
 *    1、v-model实现数据双向绑定的原理？
 *    2、是监听input事件？还是change事件？input事件是什么时候触发？change事件是什么时候触发？
 *
 *  问题：
 *    1、下面的这种写法真的会和上面的那种v-model的写法一致吗？实际证明：有细微差别
 *    差别在于：在中文输入法下，v-model的写法，只有在中文输入完毕的情况下，才会更新在界面上，而下面的这种会直接将输入的拼音回显到页面上
 *  分析：
 *    实际上是v-model指令在运行时的时候做了一些优化，分析源码可知道 v-model 监听了compositionstart，compositionend事件，在这两个
 *    事件的回调函数中对事件的composing的值做了处理，e.target.composing = false/true return与否，来进行了优化
 *
 *    而下面的那种没有做那种优化，虽然原理和v-model一样，即少了一个运行时的优化
 *
 *  源码主要地址：
 *    1、src/core/vdom/modules/directives.js中的 _update（）函数中 对inserted()钩子函数进行了调用
 *    2、 inserted()钩子函数 是定义在 src/platforms/web/runtime/directives/model.js中
 *    3、在inserted()钩子函数 监听了compositionstart，compositionend事件
 *
 *  todo:
 *    compositionstart，compositionen事件是干嘛的，待查，补充笔记
 */
// let vm = new Vue({
//   el:'#app',
//   template: '<div>' +
//       '<p>Message is: {{message}}</p>' +
//       '<input '+
//       ':value="message" ' +
//       '@input="message=$event.target.value"' +
//       ' placeholder="edit me">' +
//       '</div>',
//   data(){
//     return {
//       message:''
//     }
//   },
//   methods:{
//   }
// })

// 最终codegen生成的代码：
// with(this){
//   return_c('div',
//       [
//         _c('p',
//             [
//               _v("Message is: "+_s(message))
//             ]),
//         _c('input',
//             {
//               directives: [
//                 {
//                   name: "model",
//                   rawName: "v-model",
//                   value: (message),
//                   expression: "message"
//                 }
//               ],
//               attrs: {
//                 "placeholder": "edit me"
//               },
//               domProps: {
//                 "value": (message)
//               },
//               on: {
//                 "input": function($event){
//                   if($event.target.composing)return;message=$event.target.value
//                 }
//               }
//             })
//       ])
// }
