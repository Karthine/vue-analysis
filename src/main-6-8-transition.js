import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-8-transition
 * todo 注意：也需要在index.html里面写上css过渡样式变化
 * todo
 *     其实分析源码可知：（）
 *        源码地址：src/platforms/web/runtime/modules/transition.js中
 *        transition处理动画只是管理什么时候添加对应的类名，即class,而真正做动画的是我们自己写的css过渡动画样式
 
 **/


// todo transition上的appear属性表示首次渲染的时候也会有过渡效果
let vm = new Vue({
  el: '#app',
  template: '<div id="demo">' +
      '<button @click="show = !show">Toggle</button>' +
      '<transition :appear="true" name="fade">' +
      '<p v-if="show">hello</p>' +
      '</transition>' +
      '</div>',
  data(){
    return {
      show: true
    }
  },
})
