<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="movie">Movie</label>
          <md-select v-model="movie" name="movie" id="movie">
            <md-option value="fight-club">Fight Club</md-option>
            <md-option value="godfather">Godfather</md-option>
            <md-option value="godfather-ii">Godfather II</md-option>
            <md-option value="godfather-iii">Godfather III</md-option>
            <md-option value="godfellas">Godfellas</md-option>
            <md-option value="pulp-fiction">Pulp Fiction</md-option>
            <md-option value="scarface">Scarface</md-option>
          </md-select>
        </md-field>
      </div>
    </div>

    <md-button class="md-primary md-raised" @click="movie = 'pulp-fiction'">Set Pulp Fiction</md-button>
  </div>
</template>

<script>
export default {
  name: 'BasicSelect',
  data: () => ({
    movie: 'godfather',
    country: null,
    font: null
  })
}
</script>