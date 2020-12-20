<template>
    <div id="app">
        <img src="./assets/logo.png" alt="">
        <div>
            {{name}}
        </div>
        <button @click="change" class="change">change</button>
        <button @click="changeLast">change last name</button>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                firstName: 'Yi',
                lastName: 'Huang',
                useless: 0,
                nested: {
                    a: {
                        b: 1
                    }
                }

            }
        },
        computed: {
            name() {
                if (this.useless > 0) {
                    return this.firstName + ',' + this.lastName
                }
                return 'please click change'
            }
        },
        methods: {
            change() {
                this.useless++
                this.nested.a.b = 2
            },
            changeLast() {
                this.lastName = 'Zhang'
            }
        },
        watch: {
            useless(newVal) {
                console.log('useless: ',newVal)
            },
            name:{
                immediate: true, // todo 当配置了immediate属性的时候，会立马执行回调函数
                handler(newVal){  //回调函数
                    console.log('name:',newVal)
                }
            },
            nested:{
                deep:true, // todo deep的作用是为了监听嵌套深层次的对象，如果为false的话，监听不到nested.a.b的变化
                // sync:true, // todo sync:true提升该watcher的优先级，第一个执行该watcher的回调函数
                handler(newVal){
                    console.log('nested:',newVal.a.b)
                }
            },

        },


    }

    /**
     * 运行结果：
     *      首页会输出：name: please click change 【第52行输出的结果，name的handler回调函数执行的结果】
     *      当点击change按钮的时候：会输出
     *              useless:1       【第47行输出的结果 useless的回调 】
                    name: Yi,Huang  【第52行输出的结果，name的handler回调函数执行的结果 】
                    nested: 2       【第59行输出的结果，nested的handler回调函数执行的结果 】
            当再次点击change按钮的时候，会输出
                    useless:2       【第47行输出的结果 useless的回调 】
            当修改watch中的nested的deep为false的时候，刷新页面，点击change按钮，输出结果为：
                【nested的回调函数没有执行】
                     useless:1       【第47行输出的结果 useless的回调 】
                     name: Yi,Huang  【第52行输出的结果，name的handler回调函数执行的结果 】
            当修改watch中的nested的deep为true,同时加上sync:true的时候，刷新页面，点击change按钮，输出结果为：
                【sync:true提升了nested的user watcher的优先级】
                nested: 2       【第59行输出的结果，nested的handler回调函数执行的结果 】
                useless:1       【第47行输出的结果 useless的回调 】
                name: Yi,Huang  【第52行输出的结果，name的handler回调函数执行的结果 】

     *
     */
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

    .change {
        margin-right: 20px;
    }
</style>
