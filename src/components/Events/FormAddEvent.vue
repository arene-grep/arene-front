<template>
  <div class="md-list">
    <form novalidate class="md-layout" @submit.prevent="validateEvent">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Ajouter un évènement</div>
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
        <md-card-actions>
          <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Ajouter</md-button>
          <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="clearForm()">Réinitialiser</md-button>
        </md-card-actions>
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
export default {
name: "FormAddEvent",
  mixins: [validationMixin],
  data: () => ({
    event:{},
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
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.name=null
      this.form.trading_card_game_id=null
      this.form.date=null
    },
    saveEvent () {
      this.sending = true
      this.event.name = this.form.name
      this.event.trading_card_game_id = this.form.trading_card_game_id
      this.event.date = this.form.date
      const _this = this
      console.log("my event : ", this.event)
      this.$store.dispatch('addEvent', this.event)
          .then(() => this.$router.push('/events'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    validateEvent () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveEvent()
      }
    }
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
