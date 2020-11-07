import Vue from 'vue'

let childComp = {
  template:'<div>{{msg}}</div>',
  created() {
    console.log('child created')
  },
  mounted(){
    console.log('child mounted')
  },
  data(){
    return {
      msg: 'Hello Vue'
    }
  }
}

Vue.mixin({
  created() {
    console.log('parent created')
  }
})


let app = new Vue({
  el: '#app',
  render: h => h(childComp)
})

/**
 * 输出结果
 *  parent created
 *  parent created
    child created
    child mounted

 debugger断点 先走Vue.mixin ===》 new Vue ==》_init(options) => mergeOptions(...)  ==》输出parent created --》 childComp==》 输出parent created child created child mounted
 *
 *
 * */
