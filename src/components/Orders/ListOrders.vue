<template>
  <div>
    <md-list class="md-triple-line">
      <md-card-header>
        <div class="md-title">Vos commandes</div>
      </md-card-header>
    </md-list>
    <md-list class="md-triple-line">
      <div v-for="order in orders" :key="order.id">
        <md-list-item :to="{name: 'getOrder', params:{id:order.id}}">
          <md-avatar >
            <img src="../../assets/logo-arene.png">
          </md-avatar>
          <div class="md-list-item-text">
            <span>Numéro de commande : {{ order.id }}</span>
            <span>Date : {{ order.date }}</span>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
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
</style>
