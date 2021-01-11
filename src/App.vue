<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <AppMobile v-if="isMobile()"></AppMobile>
    <AppDesktop v-else></AppDesktop>
    <router-view />
  </div>
</template>

<script>
import AppMobile from '@/components/App/AppMobile'
import AppDesktop from '@/components/App/AppDesktop'

export default {
  components: {AppMobile, AppDesktop},
  methods:{
    isMobile() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}
  }
};
</script>

<style  lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>