<template>
    <div>
        <theHeader @toggleComponent="toggleComponent" />
        <home v-if="componentName === 'home'"/>
        <conversionHistory v-else /> 
        <theFooter />
    </div>
</template>

<script>
import theHeader from './layout/TheHeader.vue';
import theFooter from './layout/TheFooter.vue';
import home from './components/Home.vue';
import conversionHistory from './components/ConversionHistory.vue';
export default {
  name: 'App',
  components: {
    theHeader,
    theFooter,
    home,
    conversionHistory
  },
  data(){
    return {
      componentName: 'home'
    };
  },
  methods:{
    toggleComponent(comp){
      if(comp === 'home'){
        this.componentName = 'home';
      }else{
        this.componentName = 'conversionHistory';
      }
    }
  }
}
</script>

<style>
  *{
    margin:0px;
    padding:0px;
    font-family: sans-serif;
    box-sizing: border-box;
  }

  .container{
    background-color:white;
    padding:20px;
    margin:10px 5px;
  }

   .form-group{
        display:flex;
        justify-content: center;
        align-items:center;
        padding: 10px 5px;
        margin: 10px 5px;
    }

    .form-group input{
        flex:10;
        padding:5px;
        min-width:200px;
        height:50px;
        border:none;
        border:1px solid grey;
        border-top-left-radius:6px;
        border-bottom-left-radius:6px;
    }

    .form-group select{
        flex:2;
        padding:5px;
        height:50px;
        border:none;
        font-weight:bold;
        border-top-right-radius:6px;
        border-bottom-right-radius:6px;
        background-color: #6930c3;
        color:white;
    }

    @media(max-width:450px){
      .container{
        padding:0px;
        margin:0px;
      }
    }

</style>
