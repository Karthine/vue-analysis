import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)
/**
 * 7-1-路由注册
 *
 *
 **/
// 1. 定义路由组件
// 可以从其他文件 import 进来
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

// 2.定义路由
// 每个路由应该映射一个组件，其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {path: '/foo', component: Foo},
    {path: '/bar', component: Bar},
]

// 3. 创建 router 实例，然后传 'routes' 配置
const router = new VueRouter({
    routes // (缩写) 相当于routes: 相当于routes
})

// 4. 创建和挂载根实例
// 记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
    el: '#app',
    render(h){
        return h(App)
    },
    router
})
