<template>
  <div class="signup-form-container">
    <div class="form-title">
      <md-icon class="md-size-2x">restaurant</md-icon>
      <span>Inscription</span>
    </div>
    <form novalidate class="form" @submit.prevent="validateForm">
      <md-field :class="getValidationClass('username')">
        <label for="username">Nom d'utilisateur</label>
        <md-input name="username" id="username" v-model="form.username"/>
        <span class="md-error" v-if="!this.$v.form.username.required">Le nom d'utilisateur est requis.</span>
      </md-field>
      <md-field :class="getValidationClass('password')">
        <label for="password">Mot de passe</label>
        <md-input name="password" id="password" v-model="form.password"/>
        <span class="md-error" v-if="!this.$v.form.password.required">Le mot de passe est requis.</span>
      </md-field>
      <md-field :class="getValidationClass('passwordConfirmation')">
        <label for="passwordConfirmation">Confirmation du mot de passe</label>
        <md-input name="passwordConfirmation" id="passwordConfirmation" v-model="form.passwordConfirmation"/>
        <span class="md-error" v-if="!this.$v.form.passwordConfirmation.required">Le mot de passe de confirmation est requis.</span>
        <span class="md-error" v-if="!this.$v.form.passwordConfirmation.sameAsPassword">Le mot de passe de confirmation et le mot de passe doivent être identiques</span>
      </md-field>
      <md-button type="submit" class="md-primary sign-in-button">S'inscrire</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, sameAs } from 'vuelidate/lib/validators'

  export default {
    name: 'SignUpForm',
    mixins: [validationMixin],
    data() {
      return {
        form: {
          username: null,
          password: null,
          passwordConfirmation: null
        }
      }
    },
    validations: {
      form: {
        username: { required },
        password: { required },
        passwordConfirmation: { required, sameAsPassword: sameAs('password') }
      }
    },
    methods: {
      validateForm() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.register();
        }
      },
      register: function () {
        let username = this.form.username;
        let password = this.form.password;
        let passwordConfirmation = this.form.passwordConfirmation;
        this.$store.dispatch('user/signUp', { username, password, passwordConfirmation })
        .then(() => this.$router.push('signin'))
        .catch(err => console.log(err))
      },
      getValidationClass(fieldName) {
        const field = this.$v.form[fieldName];

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      }
    }
  }
</script>

<style scoped>
  .signup-form-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
  }

  .md-icon {
    display: contents;
  }

  .form {
    width: 30vh
  }

  .form-title span {
    font-size: 24pt;
    font-weight: bold;
  }

  .sign-in-button {
    float: right;
    margin-top: 16px;
  }
</style>
