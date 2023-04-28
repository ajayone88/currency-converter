<template>
    <div>
        <Header @navigate="navigate"/>
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/layout/header/index.vue';
import Footer from '@/components/layout/footer/index.vue';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  methods:{
    navigate(route) {
      this.$router.push(`/${route}`);
    }
  }
}
</script>

<style>
  * {
    margin:0px;
    padding:0px;
    font-family: sans-serif;
    box-sizing: border-box;
  }
</style>
