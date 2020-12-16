import Vue from 'vue'

/**
 * 第三版本 （第三章 3-4合并配置 测试）
 * 断点位置1 Vue.prototype._init = function (options) {.....debugger  if (options && options._isComponent) {...}else{...} }
 * 断点位置2： mergeOptions()方法里面：function mergeOptions (parent,child,vm) {debugger.....}
 */
let childComp = {
  template:'<div>{{msg}}</div>',
  created() {
    console.log('child created')
  },
  mounted(){
    //todo 输出this.msg能直接输出data中的msg,源码是在src/core/instance/init.js文件的Vue.prototype._init中 ---》initState(vm) --->src/core/instance/state.js中定义的
    // 访问this.msg ===>相当于 this._data.msg ==>即data中的msg
    // todo 但是通常不会访问_data,_开头的都是一些私有属性
    console.log(this.msg)
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
