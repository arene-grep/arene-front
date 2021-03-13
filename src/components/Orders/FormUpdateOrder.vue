<template>
  <div class="md-list">
    <form novalidate class="md-layout" @submit.prevent="validateOrder">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Modifier une commande</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Id</label>
                <md-input name="id" id="id" autocomplete="given-name" v-model="form.id" :disabled="true"/>
                <span class="md-error" v-if="!$v.form.id.required">Il est obligatoire de renseigner un nom.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('date')">
                <label>Date de la commande</label>
                <VueCtkDateTimePicker label="Date" format="YYYY-MM-DD HH:mm" id="date" name="date" autocomplete="date" v-model="form.date" :disabled="true" />
                <span class="md-error" v-if="!$v.form.date.required">Il est obligatoire de renseigner la date prévue.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('user_id')">
                <label>ID de l'user</label>
                <md-input name="id" id="user_id" autocomplete="given-name" v-model="form.user_id" :disabled="true" />
                <span class="md-error" v-if="!$v.form.user_id.required">Il est obligatoire de renseigner un nom.</span>
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
            <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetOrder()">Réinitialiser</md-button>
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
  required
} from 'vuelidate/lib/validators'
export default {
  name: "FormUpdateEvent",
  mixins: [validationMixin],
  data: () => ({
    active:null,
    order:{},
    tmpOrder:{},
    idOrder:null,
    form: {
      id: null,
      date: null,
      user_id: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      id: {
        required,
      },
      date: {
        required,
      },
      user_id: {
        required,
      },
    }
  },
  methods: {
    onConfirm () {
      this.sending=true,
          this.deleteOrder()
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    resetOrder () {
      this.form.name = this.tmpOrder.name
      this.form.tcg = this.tmpOrder.trading_card_game_id
      this.form.date = this.tmpOrder.date
    },
    deleteOrder () {
      this.order.id = this.idOrder
      alert("pas encore implémenté")
      this.sending = false
      // const _this = this
      // this.$store.dispatch('deleteEvent', this.order)
      //     .then(() => this.$router.push('/events'))
      //     .catch(function (error) {
      //       console.log(error)
      //       _this.sending = false
      //     })
    },
    saveOrder () {
      this.sending = true
      this.order.name = this.form.name
      this.order.tcg = this.form.tcg
      this.order.date = this.form.date
      this.order.id = this.idOrder
      alert("pas encore implémenté")
      this.sending = false
      // const _this = this
      // this.$store.dispatch('updateEvent', this.order)
      //     .then(() => this.$router.push('/events'))
      //     .catch(function (error) {
      //       console.log(error)
      //       _this.sending = false
      //     })
    },
    validateOrder () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveOrder()
      }
    }
  },
  beforeMount() {
    this.idOrder = this.$route.params.id,
        this.$store.dispatch('getOrder', this.idOrder)
        .then(data => {
          this.order = data
          this.tmpOrder = data
          this.form.id = data.id;
          this.form.date = data.date
          this.form.user_id = data.user_id
        })
        .catch(err => console.log(err))
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
