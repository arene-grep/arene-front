<template>
  <div class="home">
    <FormAddEvent></FormAddEvent>
  </div>
</template>

<script>
import FormAddEvent from '@/components/Events/FormAddEvent.vue'
export default {
  name: "EventAdd",
  components: {FormAddEvent}
}
</script>