import Vue from 'vue'
// import App from './App.vue'

/**
 * 第一版本（第一章节 1-1 准备工作～ 第二章节 2-7update 测试 ）
 * 要结合vue-2.6.12工程，一起理解，vue-2.6.12工程中有注释
 * 该入口文件为了测试 普通节点的 patch的过程，即vm.$mount的整个挂载流程，从vNode->真实的dom-->渲染到页面上的流程
 *
 *      普通节点：类似于这样 createElement('div',{attrs:{ id:'app'}},'测试')
 */

var app = new Vue({
    el: '#app',
    // 手写render函数
    render(createElement){
        return createElement('div',{
            // todo 如果这里写成app1会直接替换掉模板页面的index.html中 <div id="app"></div> ==>渲染成<div id="app1"></div>
            // todo 使用render函数就不会出现从插值表达式{{message}} => hello vue显示的一个过渡，会直接显示出来
            attrs:{
                id:'app1'
            }
        },this.message)
    },
    // todo 上面的也可以简写成 下面的，es6尖头函数
    // 这种简写方式不能访问到this.message
    // render: h => h('div',{attrs:{id:'app1'}},'测试'),
    mounted(){
        // todo 为什么 这里的this.message可以直接访问到 data中的message
        // new Vue(..)--->调用Vue.prototype._init()中 ---> initState() ————》通过proxy代理，Object.definedPorperty，访问this.message实际上访问的是this._data.message
        console.log(this.message)
        // 访问this.message 实际上 访问的是 this._data.message，但是在实际开发中不要这么访问
        console.log(this._data.message)
    },
    data(){
        return {
            message: 'Hello Vue'
        }
    }
})
