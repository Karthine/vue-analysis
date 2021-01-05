import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.use(Vuex)

/**
 * 8-3-vuex数据存储/修改 语法糖
 * 1、moduleA,moduleB相当于子仓库，通过module的概念把store拆成一个个子仓库，
 * 子仓库里面又可以有modules
 *
 * 2、源码中的重要的三处逻辑
 *      1、 this._modules = new ModuleCollection(options) // 初始化modules
        2、 installModule(this, state, [], this._modules.root)
        3、 resetStoreVM(this, state)
 *
 * 3、断点位置：
 *   1、var Store = function Store (options) { ...  debugger this._modules = new ModuleCollection(options);...}
 *   2、var Store = function Store (options) { ...  debugger installModule(this, state, [], this._modules.root)...}
 *   3、var Store = function Store (options) { ...  debugger resetStoreVM(this, state)...}
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
