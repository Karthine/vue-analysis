import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)
/**
 * 7-2-createMatcher
 * 断点位置：
 *  1、在node_modules中的vue-router中的vue-router.esm.js中的 function createMatcher (routes,router) {debugger...}
 *
 *  00:23:33~00:36:22   createMatcher()的介绍
 *  00:36:22～00:41:32  createMatcher()的单步调试
 **/
// 1. 定义路由组件
// 可以从其他文件 import 进来
const Foo = {template: '<div>foo</div>'}
const Bar = {template: '<div>bar</div>'}

// 2.定义路由
// 每个路由应该映射一个组件，其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {   path: '/foo',
        component: Foo,
        name:'Foo',
        children:[
            {
                path: '/bar',
                name:'Bar',
                component: Bar
            },
        ]
    },

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

/***
 *
 * createRouteMap()调用的返回值：
 *
 * pathList: ["/bar", "/foo"]
 * pathMap:{
 *      "/bar":{"path":"/bar","regex":{"keys":[]},"components":{"default":{"template":"<div>bar</div>"}},"instances":{},"enteredCbs":{},"name":"Bar","parent":{"path":"/foo","regex":{"keys":[]},"components":{"default":{"template":"<div>foo</div>"}},"instances":{},"enteredCbs":{},"name":"Foo","meta":{},"props":{}},"meta":{},"props":{}},
 *      "/foo":{"path":"/foo","regex":{"keys":[]},"components":{"default":{"template":"<div>foo</div>"}},"instances":{},"enteredCbs":{},"name":"Foo","meta":{},"props":{}}
 *      }
 *
 * nameMap:{
 *      "Bar":{"path":"/bar","regex":{"keys":[]},"components":{"default":{"template":"<div>bar</div>"}},"instances":{},"enteredCbs":{},"name":"Bar","parent":{"path":"/foo","regex":{"keys":[]},"components":{"default":{"template":"<div>foo</div>"}},"instances":{},"enteredCbs":{},"name":"Foo","meta":{},"props":{}},"meta":{},"props":{}},
 *      "Foo":{"path":"/foo","regex":{"keys":[]},"components":{"default":{"template":"<div>foo</div>"}},"instances":{},"enteredCbs":{},"name":"Foo","meta":{},"props":{}}
 *      }
 *
 * */
