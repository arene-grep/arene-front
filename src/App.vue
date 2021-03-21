<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <AppMobile v-if="isMobile"></AppMobile>
    <AppDesktop v-else></AppDesktop>
    <router-view />
  </div>
</template>

<script>
import AppMobile from '@/components/App/AppMobile'
import AppDesktop from '@/components/App/AppDesktop'
import {mapGetters} from "vuex";

export default {
  data: () => ({
    window: {
      width: 0,
      height: 0
    }
  }),
  components: {AppMobile, AppDesktop},
  computed: {
    ...mapGetters(['isMobile'])
  },
  methods:{
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width <= 800 || navigator.userAgent.match(/iPad/i)) {
        this.$store.commit('isMobileView')
      } else {
        this.$store.commit('isNotMobileView')
      }
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
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
