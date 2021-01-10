<template>
  <div class="home">
    <h2>Bienvenue!</h2>

    <div class="myCards">

    <div @click="openProducts()">
      <md-card md-with-hover>
        <div>
          <md-ripple>
            <md-card-content>
              <h2 style="text-align:center;">Vos produits</h2>
            </md-card-content>
          </md-ripple>
        </div>
      </md-card>
    </div>

    <div @click="openEvents()">
      <md-card md-with-hover>
        <div>
          <md-ripple>
            <md-card-content>
              <h2>Vos évènements</h2>
            </md-card-content>
          </md-ripple>
        </div>
      </md-card>
    </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data: () => ({
  }),
  methods:{
    openProducts() {
      window.location.pathname = '/products'
    },
    openEvents() {
      window.location.pathname = '/events'
    }
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.myCards {
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  width: 100%;
}
</style>