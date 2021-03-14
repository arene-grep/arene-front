<template>
  <div class="md-list">
    <form novalidate class="md-layout" @submit.prevent="validateProduct">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Modifier un produit</div>
        </md-card-header>
        <md-card-content>
            <img :src='"../../assets/products/product_"+tmpProduct.id+".jpg"' style="width: 20%">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Nom</label>
                <md-input name="name" id="name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">Il est obligatoire de renseigner un nom.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('description')">
                <label>Description</label>
                <md-textarea name="description" id="description" autocomplete="given-name" v-model="form.name" :disabled="sending" md-autogrow/>
                <span class="md-error" v-if="!$v.form.name.required">Il est obligatoire de renseigner un nom.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('price')">
                <label>Prix</label>
                <md-input type="number" id="price" name="price" autocomplete="price" v-model="form.price" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.price.required">Il est obligatoire de renseigner un prix.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('stock')">
                <label>Quantité</label>
                <md-input type="number" id="stock" name="stock" autocomplete="stock" v-model="form.stock" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.stock.required">Il est obligatoire de renseigner la quantité à ajouter.</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('minimum_stock')">
                <label>Stock minimal</label>
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
                  <md-option v-for="tcgame in tcgames" :key="tcgame.id" :value=" tcgame.id ">{{ tcgame.name }}</md-option>
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
                <md-select id="categoty" name="categoty" autocomplete="categoty" v-model="form.category" :disabled="sending">
                            <md-option v-for="category in categories" :key="category.id" :value=" category.id ">{{ category.name }}</md-option>
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
                  <md-option v-for="language in languages" :key="language.id" :value=" language.id ">{{ language.name }}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.language.required">Il est obligatoire de renseigner la langue</span>
                <span class="md-error" v-else-if="!$v.form.language.between">Il est obligatoire de sélectionner une des langues proposées.</span>
              </md-field>
              <div>
                <md-switch v-model="stockable" class="md-primary">Restockable</md-switch>
              </div>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <div>
          <md-dialog-confirm
              :md-active.sync="active"
              md-title="Suppression du produit"
              md-content="Attention, la suppression du produit sera définitif. <br> Êtes-vous sûr de vouloir continuer?"
              md-confirm-text="Supprimer"
              md-cancel-text="Annuler"
              @md-confirm="onConfirm" />
          <md-card-actions>
            <md-button class="md-dense md-raised md-primary" type="submit" :disabled="sending">Modifier</md-button>
            <md-button class="md-dense md-raised md-primary" :disabled="sending" @click="resetProduct()">Réinitialiser</md-button>
            <md-button class="md-raised md-accent" :disabled="sending" @click="active = true">Supprimer</md-button>
          </md-card-actions>
        </div>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import api from "@/connection/api";
import {
  required,
  between
} from 'vuelidate/lib/validators'

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    active:false,
    product:{},
    tmpProduct:{},
    idProduct:0,
    categories: [],
    tcgames: [],
    languages: [],
    stockable: true,
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
    onConfirm () {
      this.sending=true,
      this.deleteProduct()
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    deleteProduct () {
      const _this = this
      this.product.id = this.idProduct
      this.$store.dispatch('deleteProduct', this.product)
          .then(() => this.$router.push('/products'))
          .catch(function (error) {
            console.log(error)
            _this.sending = false
          })
    },
    resetProduct () {
      this.form.name = this.tmpProduct.name
      this.form.price = this.tmpProduct.price
      this.form.stock = this.tmpProduct.stock
      this.form.minimum_stock = this.tmpProduct.minimum_stock
      this.form.tcg = this.tmpProduct.trading_card_game_id
      this.form.category = this.tmpProduct.category_id
      this.form.language = this.tmpProduct.language_id
    },
    saveProduct () {
      this.sending = true
      this.product.id = this.idProduct
      this.product.name = this.form.name
      this.product.price = this.form.price
      this.product.stock = this.form.stock
      this.product.minimum_stock = this.form.minimum_stock
      this.product.category = this.form.category
      this.product.tcg = this.form.tcg
      this.product.language = this.form.language
      this.product.restockable = this.restockable
      const _this = this
      this.$store.dispatch('updateProduct', this.product)
          .then(() => this.$router.push('/products'))
          .catch(function (error) {
            console.log("dans le add error : ")
            console.log(error)
            _this.sending = false
          })
    },
    validateProduct () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveProduct()
      }
    }
  },
  beforeMount() {
    this.idProduct = this.$route.params.id,
        api.getProduct(this.idProduct)
            .done((data)=> {
              this.tmpProduct = data,
              this.form.name = data.name;
              this.form.price = data.price,
              this.form.stock = data.stock,
              this.form.minimum_stock = data.minimum_stock,
              this.form.tcg = data.trading_card_game_id,
              this.form.category = data.category_id
              this.form.language = data.language_id
            }),
    api.getCategories()
      .done((data) => {
        this.categories = data
      })
      .fail(() => {
      })
      .always(() => {
      }),
    api.getTcgames()
      .done((data) => {
        this.tcgames = data
      })
      .fail(() => {
      })
      .always(() => {
      }),
    api.getLanguages()
      .done((data) => {
        this.languages = data
      })
      .fail(() => {
      })
      .always(() => {
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

  .md-switch {
    display: flex;
  }

  table {
    width: 100%;
    table-layout: fixed;

    th {
      text-align: left;
    }
  }
</style>
