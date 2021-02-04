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
  }
</style>
