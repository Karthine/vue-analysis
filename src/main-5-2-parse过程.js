import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 5-2-parse debugger
 * 断点位置：var createCompiler = createCompilerCreator(function baseCompile (template,options) { debugger var ast = parse(template.trim(), options);...}
 */
// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
new Vue({
  el: '#app',
  template:'<ul :class="bindCls" class="list" v-if="isShow">'+
      '<li v-for="(item,index) in data" @click="clickItem(index)">{{item}}:{{index}}</li>'+
      '</ul>',
  data(){
    return {
      bindCls:'a',
      isShow:true,
      data:['A','B','C','D']
    }
  },
  methods:{
    clickItem(index){
      console.log(index)

    }
  }
})

/**
 *
 * parse生成的ast树：
 attrsList: []
 attrsMap: {:class: "bindCls", class: "list", v-if: "isShow"}
 children: Array(1)
   0: {type: 1, tag: "li", attrsList: Array(1), attrsMap: {…}, rawAttrsMap: {…}, …}
   length: 1
   __proto__: Array(0)
 classBinding: "bindCls"
 end: 135
 if: "isShow"
 ifConditions: [{…}]
 parent: undefined
 plain: false
 rawAttrsMap:
   :class: {name: ":class", value: "bindCls", start: 4, end: 20}
   class: {name: "class", value: "list", start: 21, end: 33}
   v-if: {name: "v-if", value: "isShow", start: 34, end: 47}
   __proto__: Object
 start: 0
 staticClass: ""list""
 tag: "ul"
 type: 1
 *
 *
 *
 */


