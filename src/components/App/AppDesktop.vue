<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed-last" style="position: fixed; width: 100%; z-index: 10">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <span class="md-title">L'Arène de Duel</span>
          </div>
        </div>

        <div class="md-toolbar-row" style="justify-content:center;">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Accueil" to="/home"></md-tab>
            <md-tab id="tab-pages" md-label="Produits" to="/products"></md-tab>
            <md-tab id="tab-posts" md-label="Évènements" to="/events"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>
      <md-app-content>
      </md-app-content>
    </md-app>
    <br><br><br><br><br><br><br>
    <img src="../../assets/logo-arene.png" />
    <br><br>
  </div>
</template>

<style lang="scss" scoped>

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.page-container {
  min-height: 100px;
  overflow: hidden;
  //position: relative;
  //border: 1px solid rgba(#000, .12);
}
</style>

<script>
export default {
  name: 'LastRowFixed',
  data: () => ({
    menuVisible: false
  })
}
</script>