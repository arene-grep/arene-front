<template>
  <div id="nav">
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary" style="position: fixed; z-index: 10;">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Arene-Duel</span>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable style="position: fixed; z-index: 10;">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Arene-Duel</span>
      </md-toolbar>
      <md-list>
        <md-list-item to="/home" @click="showNavigation = false">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Accueil</span>
        </md-list-item>
        <md-list-item to="/products" @click="showNavigation = false">
          <md-icon>list</md-icon>
          <span class="md-list-item-text">Afficher vos produits</span>
        </md-list-item>
        <md-list-item to="/addProduct" @click="showNavigation = false">
          <md-icon>add</md-icon>
          <span class="md-list-item-text">Ajouter un produit</span>
        </md-list-item>
        <md-list-item to="/events" @click="showNavigation = false">
          <md-icon>list</md-icon>
          <span class="md-list-item-text">Afficher vos évènements</span>
        </md-list-item>
        <md-list-item to="/addEvent" @click="showNavigation = false">
          <md-icon>add</md-icon>
          <span class="md-list-item-text">Ajouter un évènement</span>
        </md-list-item>
        <md-list-item to="/about" @click="showNavigation = false">
          <md-icon>settings</md-icon>
          <span class="md-list-item-text">Plus</span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <br><br><br><br>
    <img alt="Vue logo" src="../assets/logo-arene.png" />
    <br><br>
  </div>
  </div>
</template>

<script>
export default {
  name: "Temporary",
  data: () => ({
    showNavigation: false,
    showSidepanel: false
  })
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  //padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page-container {
  min-height: 100px;
  overflow: hidden;
//position: relative;
//border: 1px solid rgba(#000, .12);
}

// Demo purposes only
   .md-drawer {
     width: 230px;
     max-width: calc(100vw - 125px);
   }
</style>