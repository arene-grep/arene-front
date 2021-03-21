<template>
  <div  style="margin-top: 3%">
    <form novalidate class="md-layout md-alignment-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
              <md-field :class="getValidationClass('name')">
                <label>Name</label>
                <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
              </md-field>
          </div>

          <div class="md-layout">
              <md-field :class="getValidationClass('password')">
                <label>Password</label>
                <md-input name="password" id="password" v-model="form.password" :disabled="sending" type="password"/>
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
              </md-field>
          </div>

          <div class="md-layout">
              <md-field :class="getValidationClass('email')">
                <label>Email</label>
                <md-input name="email" id="email" v-model="form.email" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
                <span class="md-error" v-else-if="!$v.form.email.minlength">Invalid email</span>
              </md-field>
          </div>

          <div class="md-layout">
            <md-field>
              <label>Nickname</label>
              <md-input name="nickname" id="nickname" v-model="form.nickname" :disabled="sending" />
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Register</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <md-dialog-alert
      :md-active.sync="badRegister"
      md-content="L'utilisateur existe déjà"
      md-confirm-text="Réessayer" />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'

import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
import router from '@/router'

export default {
  name: 'RegisterForm',
  mixins: [validationMixin],
  data: () => ({
    badRegister: false,
    user: {},
    form: {
      name: null,
      password: null,
      email: null,
      nickname: null
    },
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(3)
      },
      email: {
        email,
        required,
        minLength: minLength(3)
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
      this.form.name = null
      this.form.password = null
      this.form.email = null
      this.form.nickname = null
    },
    saveUser () {
      const _this = this
      this.sending = true
      const data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        nickname: this.form.nickname
      }
      this.$store.dispatch('register', data)
        .then(function () {
          router.push('/')
        })
        .catch(function () {
          _this.sending = false
          _this.badRegister = true
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
