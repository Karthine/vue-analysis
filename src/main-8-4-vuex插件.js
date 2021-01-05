import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
// todo logger方便调试state的变化
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
/**
 * 8-4-vuex插件

 * */

const moduleA = {
    namespaced: true,
    state:{
        count: 5
    },
    mutations:{
        increment(state){
            state.count++
        }
    },
    actions: {
        increment(store){
            store.commit('increment')
        }
    },
    getters: {
        computedCount(state){
            return state.count + 1
        }
    }
}
const moduleB = {
    namespaced: true,
    state:{
        count: 1
    },
    mutations:{
        increment(state){
            state.count++
        }
    },
    actions: {
        increment(store){
            store.commit('increment')
        }
    },
    getters: {
        computedCount(state){
            return state.count + 1
        }
    }
}

const store = new Vuex.Store({
    modules:{
        a: moduleA,
        b: moduleB
    },
    state:{
        count: 1
    },
    getters:{
        computedCount(state){
            return state.count + 1
        }
    },
    mutations:{
        increment(state){
            state.count++
        }
    },
    actions: {
        increment(store){
         return new Promise(resolve => {
             setTimeout(()=>{
                 // todo 修改数据的入口还是得提交mutation
                 store.commit('increment')
                 resolve(store.rootState)
             },1000)
         })
        }
    },
    //=============todo 以下为新增点 ==============
    strict:true,
    plugins:debug ? [createLogger()] : []



})

window.store = store
console.log(store)

const app = new Vue({
    el: '#app',
    store,
    render(h){
        return h(App)
    }
})
