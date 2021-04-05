import Vue from 'vue'
// import App from './App'

Vue.config.productionTip = false

/**
 * 6-9-transition-group
 * todo 注意：也需要在index.html里面写上css过渡样式变化
 * 源码是在：src/platforms/web/runtime/components/transition-group.js中
 *
 *01:20:58~02:07~53 transition-group
 **/

// todo transition-group 上的tag表示transition-group最终渲染成的标签
let vm = new Vue({
  el: '#app',
  template: '<div id="list-complete-demo" class="demo">' +
      '<button @click="add">Add</button>' +
      '<button @click="remove">Remove</button>' +
      '<transition-group name="list-complete" tag="p">' +
      '<span v-for="item in items" :key="item" class="list-complete-item">{{item}}</span>' +
      '</transition-group>' +
      '</div>',
  data(){
    return {
      items: [1,2,3,4,5,6,7,8,9],
      nextNum: 10
    }
  },
  methods:{
    randomIndex(){
      return Math.floor(Math.random() * this.items.length)
    },
    add(){
      this.items.splice(this.randomIndex(),0,this.nextNum++)
    },
    remove(){
      this.items.splice(this.randomIndex(),1)
    }
  }
})
