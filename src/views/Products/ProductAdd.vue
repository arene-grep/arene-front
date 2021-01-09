<template>
  <div class="home">
    <FormAddProduct></FormAddProduct>
  </div>
</template>

<script>
// @ is an alias to /src
import FormAddProduct from '@/components/Products/FormAddProduct.vue'

export default {
  name: 'ProductAdd',
  components: {FormAddProduct}
}
</script>