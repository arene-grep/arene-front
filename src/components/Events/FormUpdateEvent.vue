<template>
  <div>
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
              <md-field :class="getValidationClass('tcg')">
                <label for="tcg">Jeu de cartes</label>
                <md-select id="tcg" name="tcg" autocomplete="tcg" v-model="form.tcg" :disabled="sending">
                  <md-option value=1>1</md-option>
                  <md-option value=2>2</md-option>
                  <md-option value=3>3</md-option>
                  <md-option value=4>4</md-option>
                  <md-option value=5>5</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.tcg.required">Il est obligatoire de renseigner le jeu de cartes lié à cet évènement.</span>
                <span class="md-error" v-else-if="!$v.form.tcg.between">Il est obligatoire de sélectionner un des jeu de cartes proposés.</span>
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
              :md-active.sync="active"
              md-title="Suppression de l'évènement"
              md-content="Attention, la suppression de l'évènement sera définitif. <br> Êtes-vous sûr de vouloir continuer?"
              md-confirm-text="Supprimer"
              md-cancel-text="Annuler"
              @md-confirm="onConfirm" />
          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Modifier</md-button>
            <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetEvent()">Réinitialiser</md-button>
            <md-button class="md-raised md-accent" :disabled="sending" @click="active = true">Supprimer</md-button>
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
    active:null,
    event:{},
    tmpEvent:{},
    idEvent:null,
    form: {
      name: null,
      tcg: null,
      date: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      tcg: {
        required,
        between: between(1, 5)
      },
      date: {
        required,
      },
    }
  },
  methods: {
    onConfirm () {
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
      this.form.tcg = this.tmpEvent.trading_card_game_id
      this.form.date = this.tmpEvent.date
    },
    deleteEvent () {
      api.deleteEvent(this.idEvent)
          .done((data) => {
            window.location.pathname = '/events'
            console.log(data)
          })
    },
    saveEvent () {
      this.sending = true
      this.event.name = this.form.name
      this.event.tcg = this.form.tcg
      this.event.date = this.form.date
      // format date 2021-01-09 13:53:33
      console.log(this.event)
      api.updateEvent(this.idEvent, this.event)
          .done((data) => {
            window.location.pathname = '/events'
            console.log(data)
          })
    },
    validateEvent () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveEvent()
      }
    }
  },
  beforeMount() {
    this.idEvent = this.$route.params.id,
        api.getEvent(this.idEvent)
            .done((data)=> {
              this.tmpEvent = data,
              this.form.name = data.name;
              this.form.tcg = data.trading_card_game_id,
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
</style>