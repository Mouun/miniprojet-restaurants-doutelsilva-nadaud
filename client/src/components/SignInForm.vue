<template>
  <div class="signin-form-container">
    <div class="form-title">
      <md-icon class="md-size-2x">restaurant</md-icon>
      <span>Connexion</span>
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
        <span class="md-error"
              v-if="!this.$v.form.password.required">Le mot de passe est requis.</span>
      </md-field>
      <md-button type="submit" class="md-primary sign-in-button">Se connecter</md-button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'

  export default {
    name: 'SignInForm',
    mixins: [validationMixin],
    data() {
      return {
        form: {
          username: null,
          password: null
        }
      }
    },
    validations: {
      form: {
        username: { required },
        password: { required }
      }
    },
    methods: {
      validateForm() {
        this.$v.$touch();

        if (!this.$v.$invalid) {
          this.login();
        }
      },
      login: function () {
        let username = this.form.username;
        let password = this.form.password;
        this.$store.dispatch('user/signIn', { username, password })
        .then(() => this.$router.push('restaurants'))
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
  .signin-form-container{
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
    margin: 0;
  }
</style>
