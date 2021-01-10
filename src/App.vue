<template>
  <div id="app">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons">
    <AppComposant></AppComposant>
    <router-view />
  </div>
</template>

<script>
import AppComposant from '@/components/AppComposant'

export default {
  components: {AppComposant},
};
</script>