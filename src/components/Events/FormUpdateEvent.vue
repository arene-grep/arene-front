<template>
  <div class="md-list">
    <form novalidate class="md-layout" @submit.prevent="validateEvent">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Modifier un évènement</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Nom</label>
                <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">Il est obligatoire de renseigner un nom.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('trading_card_game_id')">
                <label>Jeu de cartes</label>
                <md-select id="trading_card_game_id" name="trading_card_game_id" autocomplete="trading_card_game_id" v-model="form.trading_card_game_id" :disabled="sending">
                  <md-option value=1>1</md-option>
                  <md-option value=2>2</md-option>
                  <md-option value=3>3</md-option>
                  <md-option value=4>4</md-option>
                  <md-option value=5>5</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.trading_card_game_id.required">Il est obligatoire de renseigner le jeu de cartes lié à cet évènement.</span>
                <span class="md-error" v-else-if="!$v.form.trading_card_game_id.between">Il est obligatoire de sélectionner un des jeu de cartes proposés.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('date')">
                <label for="date"></label>
                <VueCtkDateTimePicker label="Date" format="YYYY-MM-DD HH:mm" id="date" name="date" autocomplete="date" v-model="form.date" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.date.required">Il est obligatoire de renseigner la date prévue.</span>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <div>
          <md-dialog-confirm
              :md-active.sync="activeDelete"
              md-title="Suppression de l'évènement"
              md-content="Attention, la suppression de l'évènement sera définitive. <br> Êtes-vous sûr de vouloir continuer?"
              md-confirm-text="Supprimer"
              md-cancel-text="Annuler"
              @md-confirm="onConfirmDelete" />
          <md-dialog-confirm
              :md-active.sync="activeUpdate"
              md-title="Modifier l'évènement"
              md-content="Attention, la modification de l'évènement sera définitive. <br> Êtes-vous sûr de vouloir continuer?"
              md-confirm-text="Modifier"
              md-cancel-text="Annuler"
              @md-confirm="saveEvent" />
          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Modifier</md-button>
            <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetEvent()">Réinitialiser</md-button>
            <md-button class="md-raised md-accent" :disabled="sending" @click="activeDelete = true">Supprimer</md-button>
          </md-card-actions>
        </div>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  between
} from 'vuelidate/lib/validators'
import api from "@/connection/api";
export default {
  name: "FormUpdateEvent",
  mixins: [validationMixin],
  data: () => ({
    activeDelete:null,
    activeUpdate:null,
    event:{},
    tmpEvent:{},
    idEvent:null,
    form: {
      name: null,
      trading_card_game_id: null,
      date: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      trading_card_game_id: {
        required,
        between: between(1, 5)
      },
      date: {
        required,
      },
    }
  },
  methods: {
    onConfirmDelete () {
      this.sending=true,
          this.deleteEvent()
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    resetEvent () {
      this.form.name = this.tmpEvent.name
      this.form.trading_card_game_id = this.tmpEvent.trading_card_game_id
      this.form.date = this.tmpEvent.date
    },
    deleteEvent () {
      const _this = this
      this.event.id = this.idEvent
      this.$store.dispatch('deleteEvent', this.event)
          .then(() => this.$router.push('/events'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    saveEvent () {
      this.sending = true
      this.event.name = this.form.name
      this.event.trading_card_game_id = this.form.trading_card_game_id
      this.event.date = this.form.date
      this.event.id = this.idEvent
      this.sending = true
      const _this = this
      this.$store.dispatch('updateEvent', this.event)
          .then(() => this.$router.push('/events'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    validateEvent () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.activeUpdate = true
      }
    }
  },
  beforeMount() {
    this.idEvent = this.$route.params.id,
        api.getEvent(this.idEvent)
            .done((data)=> {
              this.tmpEvent = data,
              this.form.name = data.name;
              this.form.trading_card_game_id = data.trading_card_game_id,
              this.form.date = data.date
            })
  }
}
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-list {
  width: 25000px;
  max-width: 85%;
  display: inline-block;
  vertical-align: top;
}
</style>
