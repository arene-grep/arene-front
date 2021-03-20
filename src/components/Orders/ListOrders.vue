<template>
  <div>
            <div class="md-layout">
              <div class="md-layout-item">
      </div>
      <div class="md-layout-item">
        <md-field md-clearable>
          <label>Numéro commande</label>
          <md-input v-model="order_number" placeholder="Numéro de commande" v-on:keydown.enter="searchOrder"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item">
      </div>
      <div class="md-layout-item">
        <md-field md-clearable>
          <label>Email client</label>
          <md-input v-model="user" placeholder="Email du client" v-on:keydown.enter="searchOrder"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item-button">
        <md-button class="md-primary" @click="searchOrder">Chercher</md-button>
      </div>
      <div class="md-layout-item">
      </div>
    </div>
    <md-list class="md-triple-line">
      <md-card-header>
        <div class="md-title">Vos commandes</div>
      </md-card-header>
    </md-list>
    <md-list class="md-triple-line">
      <div>
        <md-content class="md-primary">
      <label>Commandes ouvertes</label>
      <div v-for="order in orders" :key="order.id">
        <md-list-item v-if="checkStatus(order.status)" :to="{name: 'getOrder', params:{id:order.id}}">
          <md-avatar class="md-large">
            <img src="../../assets/logo-arene.png">
          </md-avatar>
          <div class="md-list-item-text">
            <span>Numéro de commande : {{ order.id }}</span>
            <span>Date : {{ order.date }}</span>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
      </md-content>
            </div>
      <div>
        <md-content class="md-accent">
      <label>Commandes fermées</label>
      <div v-for="order in orders" :key="order.id">
        <md-list-item v-if="checkStatus(order.status)==false" :to="{name: 'getOrder', params:{id:order.id}}">
          <md-avatar  class="md-large">
            <img src="../../assets/logo-arene.png">
          </md-avatar>
          <div class="md-list-item-text">
            <span>Numéro de commande : {{ order.id }}</span>
            <span>Date : {{ order.date }}</span>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
      </md-content>
      </div>
    </md-list>
  </div>
</template>

<script>

export default {
  name: 'TripleLine',
  data: () => {
    return {
      orders:[]
    }
  },
  beforeMount() {
    this.$store.dispatch('getOrders')
        .then(data => {
          this.orders = data
        })
        .catch(err => console.log(err))
  },
    methods: {
    checkStatus (status) {
      if (status == 'commande terminée') { return false } else { return true }
    },

        searchOrder () {
      return true
    },
    }
}


</script>

<style lang="scss" scoped>
.md-list {
  width: 25000px;
  max-width: 85%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}

.md-layout {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
