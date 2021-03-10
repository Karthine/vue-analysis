import Vue from 'vue'
import App from './App'

// new Vue的代码执行是在：vue源码中的src/core/instance/index.js中
let app = new Vue({
    el: '#app',
    render(h){
        return h(App)
    }
})

