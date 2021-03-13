<template>
  <div id="nav">
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary" style="position: fixed; z-index: 10;">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">L'Arène de Duel</span>
    </md-toolbar>
    <md-drawer :md-active.sync="showNavigation" md-swipeable style="position: fixed; z-index: 10;">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">L'Arène de Duel</span>
      </md-toolbar>
      <md-list>
        <md-list-item to="/home" @click="showNavigation = false">
          <md-icon>home</md-icon>
          <span class="md-list-item-text">Accueil</span>
        </md-list-item>
        <md-list-item to="/products" @click="showNavigation = false" v-if="isLoggedIn">
          <md-icon>shopping_cart</md-icon>
          <span class="md-list-item-text">Vos produits</span>
        </md-list-item>
        <md-list-item to="/events" @click="showNavigation = false" v-if="isLoggedIn">
          <md-icon>event</md-icon>
          <span class="md-list-item-text">Vos évènements</span>
        </md-list-item>
        <md-list-item to="/orders" @click="showNavigation = false" v-if="isLoggedIn">
          <md-icon>shopping_cart</md-icon>
          <span class="md-list-item-text">Vos commandes</span>
        </md-list-item>
        <md-list-item to="/account" @click="showNavigation = false" v-if="isLoggedIn">
          <md-icon>account_box</md-icon>
          <span class="md-list-item-text">Account</span>
        </md-list-item>
        <md-list-item to="/login" @click="logout" v-if="isLoggedIn">
          <md-icon>logout</md-icon>
          <span class="md-list-item-text">Logout</span>
        </md-list-item>
      </md-list>
    </md-drawer>
    <br><br><br><br>
    <img src="../../assets/logo-arene.png" />
    <br><br>
  </div>
  </div>
</template>

<script>
export default {
  name: "Temporary",
  data: () => ({
    showNavigation: false,
  }),
  methods: {
    logout: function () {
      this.showNavigation = false
      this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
}
</script>

<style lang="scss">

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
  width: 500px;
  max-width: calc(100vw - 125px);
}
</style>
