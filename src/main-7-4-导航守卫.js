import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)
/**
 * 7-4-导航守卫
 * 断点位置：
 *  1、在node_modules中的vue-router中的vue-router.esm.js中的   History.prototype.transitionTo = function transitionTo (location,onComplete,onAbort) {var this$1 = this; debugger....}
 *  2、 function transitionTo (location,onComplete,onAbort) {var this$1 = this; debugger....this.confirmTransition(route,function () {debugger...}...}
 **/
// 1. 定义路由组件
// 可以从其他文件 import 进来
const Foo = {
    template: '<div>' +
        '<div>foo</div>' +
        '<router-link to="bar" :append="true">Go to Bar</router-link>' +
        '<router-view></router-view>' +
        '</div>',
    beforeRouteEnter(to, from, next){
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取实例 `this`
        // 因为当前守卫执行前，组件实例还没被创建
        console.log('foo before router enter')
        console.log('this ? ', this)
        next((vm) => {
            console.log('now this?', vm)
        })
    },
    beforeRouteUpdate(to, from, next){
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id, 在/foo/1 和/foo/2之间跳转的时候，
        // 由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        console.log('foo before router update')
        console.log('this ? ', this)
        next()
    }
}

const Bar = {
    template: '<div>bar</div>',
    beforeRouteLeave(to, from, next){
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        console.log('bar before router leave')
        next()
    }
}

// 2.定义路由
// 每个路由应该映射一个组件，其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {   path: '/foo',
        component: Foo,
        children:[
            {
                // path: '/bar', 错误❌
                path: 'bar', // todo children的 path不能加 / ,如果加了/，会导致beforeEnter()导航钩子函数不能执行 注意
                component: Bar,
                beforeEnter(to, from, next){
                    console.log('bar before enter')
                    next()
                }
            },
        ]
    },

]

// 3. 创建 router 实例，然后传 'routes' 配置
const router = new VueRouter({
    routes // (缩写) 相当于routes: 相当于routes
})

// 以下三个是全局的路由守卫，每次切换的路由的时候，都会调用，包括第一次运行的时候
router.beforeEach((to, from, next)=>{
    console.log('global before each')
    next()  // todo next()方法调用很重要，如果不调用，Foo组件不会渲染
})

// todo afterEach 没有next参数，所以不需要调用next()方法
router.afterEach((to, from)=>{
    console.log('global after each')

})

router.beforeResolve((to, from, next)=>{
    console.log('global before resolve')
    next()

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
