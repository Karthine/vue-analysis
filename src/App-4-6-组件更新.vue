<template>
    <div id="app">
        <HelloWorld :flag="flag"></HelloWorld>
        <button @click="toggle" >toggle</button>
    </div>
</template>

<script>
    /**
     * App-4-6-组件更新的app.vue文件
     */
    import HelloWorld from './components/HelloWorld'
    export default {
        name: 'App',
        data() {
            return {
                flag:true
            }
        },
        components:{
            HelloWorld
        },
        methods:{
            // todo 为什么只更新了App.vue的数据，会触发HelloWorld.vue组件的重新渲染呢，也就是HelloWorld的props为什么会响应变化？
            // todo
            //      从源码角度分析, App.vue的flag属性发生变化的时候，整个App.vue的patch过程中会触发HelloWorld
            //      的prepatch钩子函数，prepatch执行==》updateChildComponent()执行===》会拿到新的props ===>
            //      HelloWorld的props ===> 触发HelloWorld组件的渲染watcher的更新 ===》HelloWorld patch
            toggle(){
                this.flag = !this.flag
            }
        }

    }

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
