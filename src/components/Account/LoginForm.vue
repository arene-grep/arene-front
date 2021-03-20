<template>
  <div style="margin-top: 3%">
    <form novalidate class="md-layout md-alignment-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('username')">
                <label>Email</label>
                <md-input name="username" id="username" v-model="form.username" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
                <span class="md-error" v-else-if="!$v.form.username.minlength">Invalid username</span>
              </md-field>
          </div>

            <div class="md-layout-item">
              <md-field :class="getValidationClass('password')">
                <label>Password</label>
                <md-input name="password" id="password" v-model="form.password" :disabled="sending" type="password"/>
                <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
                <span class="md-error" v-else-if="!$v.form.password.minlength">Invalid password</span>
              </md-field>
            </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <br>
    <div>
      Vous pouvez vous connecter en cliquant <router-link to="/register">ici</router-link>
    </div>
    <md-dialog-alert
      :md-active.sync="badLogin"
      md-content="Utilisateur ou mot de passe erroné"
      md-confirm-text="Réessayer" />
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  data: () => ({
    badLogin: false,
    form: {
      username: null,
      password: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
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
      this.form.username = null
      this.form.password = null
    },
    saveUser () {
      const _this = this
      this.sending = true
      const email = this.form.username
      const password = this.form.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('/'))
        .catch(function (error) {
          console.log(error)
          _this.badLogin = true
          _this.sending = false
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
