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
  data(){
    return {
      firstName: 'Yi',
      lastName: 'Huang',
      useless: 0

    }
  },
  computed:{
    name(){
      if (this.useless > 0) {
        return this.firstName + ',' + this.lastName
      }
      return 'please click change'
    }
  },
  methods:{
    change(){
      this.useless++
    },
    changeLast(){
      this.lastName = 'Zhang'
    }
  }

    // watch:{
    //   useless(newVal){
    //     console.log(newVal)
    //   }
    // },


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

.change{
  margin-right: 20px;
}
</style>
