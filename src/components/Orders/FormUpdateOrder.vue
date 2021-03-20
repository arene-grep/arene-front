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
              <md-field :class="getValidationClass('id')">
                <label>Numéro de commande</label>
                <md-input name="id" id="id" autocomplete="given-name" v-model="form.id" :disabled="true"/>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('date')">
                <label>Date de la commande</label>
                <md-input label="Date" format="YYYY-MM-DD HH:mm" id="date" name="date" autocomplete="date" v-model="form.date" :disabled="true" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('user_id')">
                <label>ID de l'user</label>
                <md-input name="user_id" id="user_id" autocomplete="given-name" v-model="form.user_id" :disabled="true" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
                  <div class="md-layout md-alignment-left">
                      <md-radio v-model="form.status" value="commande créée">Commande créée</md-radio>
                      <md-radio v-model="form.status" value="commande prête">Commande prête</md-radio>
                      <md-radio v-model="form.status" value="commande terminée">Commande terminée</md-radio>
                      </div>
                <div class="md-layout md-alignment-left">
                  <md-switch class="md-primary" name="is_paid" id="is_paid" v-model="form.is_paid">
                    <span v-if="form.is_paid">Commande payée</span>
                    <span v-else>Commande non payée</span>
                  </md-switch>
                </div>
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
              md-title="Modifier la commande"
              md-content="Attention, la modification de la commande sera définitive. <br> Êtes-vous sûr de vouloir continuer?"
              md-confirm-text="Modifier"
              md-cancel-text="Annuler"
              @md-confirm="updateOrder" />
          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Modifier</md-button>
            <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetOrder()">Réinitialiser</md-button>
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
  required
} from 'vuelidate/lib/validators'
export default {
  name: "FormUpdateEvent",
  mixins: [validationMixin],
  data: () => ({
    activeDelete:null,
    activeUpdate:null,
    order:{},
    tmpOrder:{},
    idOrder:null,
    form: {
      id: null,
      date: null,
      user_id: null,
      is_paid: null,
      status: ''
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
      is_paid : {
        required
      },
      status: {
        required
      }
    }
  },
  methods: {
    onConfirmDelete () {
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
      this.form.date = this.tmpOrder.date
      this.form.status = this.tmpOrder.status
      this.form.is_paid = this.tmpOrder.is_paid
      this.form.status = this.tmpOrder.status
    },
    deleteOrder () {
      this.order.id = this.idOrder
      this.sending = false
      const _this = this
      this.$store.dispatch('deleteOrder', this.order)
          .then(() => this.$router.push('/orders'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    updateOrder () {
      this.sending = true
      this.order.is_paid = this.form.is_paid
      this.order.status = this.form.status
      const _this = this
      this.$store.dispatch('updateOrder', this.order)
          .then(() => this.$router.push('/orders'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    validateOrder () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.activeUpdate = true
      }
    }
  },
  beforeMount() {
    this.idOrder = this.$route.params.id
        this.$store.dispatch('getOrder', this.idOrder)
        .then(data => {
          this.order= data
          this.tmpOrder = data
          this.form.id = data.id
          this.form.date = data.date
          this.form.user_id = data.user_id
          this.form.is_paid = data.is_paid
          this.form.status = data.status
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
