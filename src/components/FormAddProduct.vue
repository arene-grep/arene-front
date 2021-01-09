<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Ajouter un produit</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Nom du produit</label>
                <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">Il est obligatoire de donner un nom au produit</span>
                <span class="md-error" v-else-if="!$v.form.name.minlength">Le nom est trop petit</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('price')">
                <label for="price">Prix</label>
                <md-input type="number" id="price" name="price" autocomplete="price" v-model="form.price" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.price.required">Il est obligatoire de donner un prix au produit</span>
                <span class="md-error" v-else-if="!$v.form.price.minLength">Le prx est trop petit</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stock')">
                <label for="stock">Quantité</label>
                <md-input type="stock" id="stock" name="stock" autocomplete="stock" v-model="form.stock" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.stock.required">Il est obligatoire de donner la quantité à ajouter</span>
                <span class="md-error" v-else-if="!$v.form.stock.minLength">La quantité doit au moins être de 0</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('minimum_stock')">
                <label for="minimum_stock">Stock minimal</label>
                <md-input type="minimum_stock" id="minimum_stock" name="minimum_stock" autocomplete="minimum_stock" v-model="form.minimum_stock" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.minimum_stock.required">Il est obligatoire de donner le stock minimal du produit</span>
                <span class="md-error" v-else-if="!$v.form.minimum_stock.minLength">La quantité doit au moins être à 0</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('category')">
                <label for="category">Catégorie</label>
                <md-input type="category" id="category" name="category" autocomplete="category" v-model="form.category" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.category.required">Il est obligatoire de donner la catégorie du produit</span>
                <span class="md-error" v-else-if="!$v.form.category.between">Il faut donner une catégorie entre 1 et 4</span>
              </md-field>
            </div>
          </div>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Ajouter</md-button>
          <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetProduct()">Réinitialiser</md-button>
        </md-card-actions>
      </md-card>

      <!--<md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>-->
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import api from "@/connection/api";
import {
  required,
  minLength,
  between
} from 'vuelidate/lib/validators'

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    product:{},
    form: {
      name: null,
      price: null,
      stock: null,
      minimum_stock: null,
      category: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(1)
      },
      price: {
        required,
        minLength: minLength(1)
      },
      stock: {
        required,
        minLength: minLength(1)
      },
      minimum_stock: {
        required,
        minLength: minLength(1)
      },
      category: {
        required,
        between: between(1, 4)
      },
    }
  },
  methods: {
    resetProduct () {
      this.form.name = null
      this.form.price = null
      this.form.stock = null
      this.form.minimum_stock = null
      this.form.category = null
    },
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
      this.form.price=null
      this.form.stock=null
      this.form.minimum_stock=null
      this.form.category=null
    },
    saveUser () {
      this.sending = true
      this.product.name = this.form.name
      this.product.price = this.form.price
      this.product.stock = this.form.stock
      this.product.minimum_stock = this.form.minimum_stock
      this.product.category = this.form.category
      api.addProduct(this.product)
          .done((data) => {
            window.location.pathname = '/products'
            console.log(data)
          })
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
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
</style>