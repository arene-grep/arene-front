<template>
  <div class="home" v-show="this.product">
    <!-- passer le props (produit à modifier -->
    <FormUpdateProduct :my-product="this.product"></FormUpdateProduct>
  </div>
</template>

<script>
import api from '../connection/api.js'
import FormUpdateProduct from "@/components/FormUpdateProduct";
export default {
  name: "ProductUpdate",
  components: {FormUpdateProduct},
  data: () => {
    return {
      product:{},
    }
  },
  // récupère le produit à mettre à jour et à donner au component "FormUpdateProduct" grâce au props "my-product"
  beforeMount() {
    // récuère l'id qui est passé dans le path http://localhost:8080/products/:id. Voir dans routes.js
    api.getProduct(this.$route.params.id)
    .done((data)=>{
      this.product = data
    })
  }
}
</script>