<template>
  <div class="home">
    <ListEvents></ListEvents>
  </div>
</template>

<script>

import ListEvents from "@/components/Events/ListEvents.vue";
export default {
  name: "events",
  components: {ListEvents}
}
</script>