<template>
    <div id="app">
        <div>
            <ul>
                <li v-for="item in items" :key="item.id">{{ item.val }}</li>
            </ul>
        </div>
        <button @click="change">change</button>
    </div>
</template>

<script>
    /**
     * App-4-7-updateChildren 【源码中debug调试updateChildren的算法 也就是组件更新的时候新旧vnode diff】
     * 在updateChildren()方法里面打断点
     */
    export default {
        name: 'App',
        data() {
            return {
                items: [
                    {id: 0, val: 'A'},
                    {id: 1, val: 'B'},
                    {id: 2, val: 'C'},
                    {id: 3, val: 'D'}
                ]
            }
        },
        methods: {
            change() {
                this.items.reverse().push({id: 4, val: 'E'})
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
