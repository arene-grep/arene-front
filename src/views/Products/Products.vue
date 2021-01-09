<template>
  <div class="home">
    <ListProducts></ListProducts>
  </div>
</template>
<script>
import ListProducts from "@/components/Products/ListProducts";
export default {
  name: "Products",
  components: {ListProducts}
};
</script>
