import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-2-v-model-组件 debugger
 * v-model整体的分析
 *     parse阶段 genComponentModel()
 *                  ===》给el添加model属性：
                                       el.model = {
                                          value: `(${value})`,
                                         expression: JSON.stringify(value),
                                         callback: `function (${baseValueExpression}) {${assignment}}`
                                       }
                    ====>transformModel()
    视频分割：
        00:58:05~01:11:49 v-model-组件 视频
 *
 */

let Child = {
  template: '<div>' +
      '<input :value="value" @input="updateValue" placeholder="edit me"> '+
      '</div>',
  props:['value'],
  methods:{
    updateValue(e){
      this.$emit('input',e.target.value)
    }
  }
}

// let Child = {
//   template: '<div>' +
//       '<input :value="msg" @input="updateValue" placeholder="edit me"> '+
//       '</div>',
//   // todo 最后新增的，查看源码中transformModel（）的实现可知：可以修改prop和event的值,如果没有设置model,prop的值就为默认值value,event的默认值为input
//   // todo 结合视频 第九章v-model 01:09:00~01:11:49
//   model:{
//     prop:'msg',
//     event:'change'
//   },
//   props:['msg'],
//   methods:{
//     updateValue(e){
//       this.$emit('change',e.target.value)
//     }
//   }
// }


/**
 * todo
 *  你会发现父组件并没有给子组件传递props,和自定义事件，只写了一个v-model="message"指令，当改变子组件的input的内容的时候，父组件的message的值也发生了改变
 * todo 分析
 *  其实 v-model 在组件上的运用也是一个语法糖，相当于一个prop + event事件 和 普通表单的原理差不多
 *  即：<Child v-model="message"></Child> 相当于 <Child :value="message" @input="message=e.target.value"></Child>
 *
 */
let vm = new Vue({
  el: '#app',
  template: '<div>' +
      '<Child v-model="message"></Child>' +
      '<p>Message is: {{message}}</p>' +
      '</div>',
  data(){
    return {
      message:''
    }
  },
  components:{
    Child
  }
})


