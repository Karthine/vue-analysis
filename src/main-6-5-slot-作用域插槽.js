import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-5-slot-作用域插槽
 *
 *     断点位置： 最终生成代码的地方    createCompilerCreator(){ var code = generate(ast, options); debugger...}
 */

let Child = {
  template: '<div class="child">' +
      '<slot text="hello" :msg="msg"></slot>' +
      '</div>',
  data(){
    return {
      msg:'Vue'
    }
  }

}

// todo slot-scope="props" slot-scope的值不一定要写成props，只是为了更语义化点，只是为了搜集子组件的插槽的内容，
//      如果写成slot-scope="xx" 也是可以的，那么p标签里面
let vm = new Vue({
  el: '#app',
  template: '<div>' +
      '<Child>' +
      '<template slot-scope="props">' +
      '<p>Hello from parent</p>' +
      '<p>{{ props.text + props.msg}}</p>' +
      '</template>' +
      '</Child>' +
      '</div>',
  components:{
      Child
  }
})

// 最终codegen生成的代码
// 父组件：
// with(this){
//   return_c('div',
//       [
//         _c('Child',
//             {
//               scopedSlots: _u([
//                 {
//                   key: "default",
//                   fn: function(props){
//                     return[
//                       _c('p',
//                           [
//                             _v("Hello from parent")
//                           ]),
//                       _c('p',
//                           [
//                             _v(_s(props.text+props.msg))
//                           ])
//                     ]
//                   }
//                 }
//               ])
//             })
//       ],
//       1)
// }

// 子组件：
// with(this){
//   return_c('div',
//       {
//         staticClass: "child"
//       },
//       [
//         _t("default",
//             null,
//             {
//               "text": "hello",
//               "msg": msg
//             })
//       ],
//       2)
// }
