<template>
  <div>
    <md-datepicker value="yyyy:MM:dd"/>

    <VueCtkDateTimePicker v-model="timedate" label="hello" format="YYYY-MM-DD HH:mm"/>
    <p>Le message est : {{ timedate }}</p>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "About",
  data: () => ({
    timedate:null
  })
};
</script>