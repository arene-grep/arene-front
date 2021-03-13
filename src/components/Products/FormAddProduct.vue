<template>
  <div class="md-list">
    <form novalidate class="md-layout" @submit.prevent="validateProduct">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Ajouter un produit</div>
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
              <md-field :class="getValidationClass('price')">
                <label for="price">Prix</label>
                <md-input type="number" id="price" name="price" autocomplete="price" v-model="form.price" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.price.required">Il est obligatoire de renseigner un prix.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stock')">
                <label for="stock">Quantité</label>
                <md-input type="number" id="stock" name="stock" autocomplete="stock" v-model="form.stock" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.stock.required">Il est obligatoire de renseigner la quantité à ajouter.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('minimum_stock')">
                <label for="minimum_stock">Stock minimal</label>
                <md-input type="number" id="minimum_stock" name="minimum_stock" autocomplete="minimum_stock" v-model="form.minimum_stock" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.minimum_stock.required">Il est obligatoire de renseigner le stock minimal.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('tcg')">
                <label>Jeu de cartes</label>
                <md-select id="tcg" name="tcg" autocomplete="tcg" v-model="form.tcg" :disabled="sending">
                  <md-option value=1>1</md-option>
                  <md-option value=2>2</md-option>
                  <md-option value=3>3</md-option>
                  <md-option value=4>4</md-option>
                  <md-option value=5>5</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.tcg.required">Il est obligatoire de renseigner le jeu de cartes auquel appartient le produit.</span>
                <span class="md-error" v-else-if="!$v.form.tcg.between">Il est obligatoire de sélectionner un des jeu de cartes proposés.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('category')">
                <label>Catégorie</label>
                <md-select id="category" name="category" autocomplete="category" v-model="form.category" :disabled="sending">
                  <md-option value=1>1</md-option>
                  <md-option value=2>2</md-option>
                  <md-option value=3>3</md-option>
                  <md-option value=4>4</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.category.required">Il est obligatoire de renseigner la catégorie.</span>
                <span class="md-error" v-else-if="!$v.form.category.between">Il est obligatoire de sélectionner une des catégories proposées.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('language')">
                <label>Langue</label>
                <md-select id="language" name="language" autocomplete="language" v-model="form.language" :disabled="sending">
                  <md-option value=1>1</md-option>
                  <md-option value=2>2</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.language.required">Il est obligatoire de renseigner la langue.</span>
                <span class="md-error" v-else-if="!$v.form.language.between">Il est obligatoire de sélectionner une des langues proposées.</span>
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
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    product:{},
    form: {
      name: null,
      price: null,
      stock: null,
      minimum_stock: null,
      tcg: null,
      category: null,
      language:null
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      price: {
        required,
      },
      stock: {
        required,
      },
      minimum_stock: {
        required,
      },
      tcg: {
        required,
        between: between(1, 5)
      },
      category: {
        required,
        between: between(1, 4)
      },
      language: {
        required,
        between: between(1, 2)
      }
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
      this.form.price=null
      this.form.stock=null
      this.form.minimum_stock=null
      this.form.tcg = null
      this.form.category=null
      this.form.tcg=null
      this.form.language=null
    },
    saveProduct () {
      this.sending = true
      this.product.name = this.form.name
      this.product.price = this.form.price
      this.product.stock = this.form.stock
      this.product.minimum_stock = this.form.minimum_stock
      this.product.category = this.form.category
      this.product.tcg = this.form.tcg
      this.product.language = this.form.language
      alert("Pas encore implémenté")

      // const _this = this
      // this.$store.dispatch('addProduct', this.product)
      // .then(() => this.$router.push('/products'))
      //     .catch(function (error) {
      //       console.log(error)
      //       _this.sending = false
      //     })
    },
    validateProduct () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveProduct()
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
