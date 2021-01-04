import Vue from 'vue'
import Vuex from 'vuex'
// import App from './App'

Vue.use(Vuex)

/**
 * 8-1-vuex初始化
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
const moduleB = {}

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
            store.commit('increment')
        }
    },

})

window.store = store
console.log(store)

const app = new Vue({
    el: '#app',
    store
})
