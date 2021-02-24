<template>
  <div>
    <md-button class="md-fab md-primary md-fixed md-fab-bottom-right" to="/addEvent">
      <md-icon>add</md-icon>
    </md-button>
    <md-list class="md-triple-line">
      <md-card-header>
        <div class="md-title">Vos évènements</div>
      </md-card-header>
    </md-list>

    <md-list class="md-triple-line">
      <div v-for="event in events" :key="event.id">
        <md-list-item :to="{name: 'getEvent', params:{id:event.id}}">
          <md-avatar >
            <img src="../../assets/logo-arene.png">
          </md-avatar>

          <div class="md-list-item-text">
            <span>{{ event.name }}</span>
            <span>{{ event.date }}</span>
            <p>Jeu de cartes : {{ event.trading_card_game_id }}</p>
          </div>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import api from "@/connection/api";

export default {
name: "ListEvents",
  data: () => {
    return {
      events:[]
    }
  },
  beforeMount() {
    api.getEvents()
        .done((data)=> {
          this.events = data
        })
        .fail(() => {
        })
        .always(()=> {
        })
  },
  methods: {
    getEvent: function(id){
      api.getEvent(id)
          .done((data)=> {
            console.log(data)
          })
    }
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