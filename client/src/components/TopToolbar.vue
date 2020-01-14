<template>
  <md-toolbar>
    <div class="md-toolbar-section-start">
      <md-button to="/">
        <div class="site-logo-container">
          <md-icon class="site-logo-icon">restaurant</md-icon>
          <h2 class="title">Restaurants</h2>
        </div>
      </md-button>
    </div>
    <div class="md-toolbar-section-end">
      <md-button v-if="isLoggedIn" class="md-icon-button">
        <md-menu>
          <md-button md-menu-trigger class="md-icon-button">
            <md-icon>person</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item @click="() => {}">Mes commandes</md-menu-item>
            <md-menu-item @click="logout">Déconnexion</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-button>
      <div v-else class="nav-links">
        <md-button to="/signin">S'identifier</md-button>
        <md-button to="/signup" class="md-raised md-primary">Inscription</md-button>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
  export default {
    name: 'TopToolbar',
    computed: {
      isLoggedIn() {
        return this.$store.getters['user/isLoggedIn'];
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('user/signOut')
        .then(() => {
          if (this.$route.name !== 'home') this.$router.push('/');
        })
      }
    }
  }
</script>

<style scoped>
  .site-logo-container {
    display: flex;
  }

  .site-logo-icon {
    margin-right: 8px !important;
  }

  .title {
    text-transform: none;
  }

  .nav-links {
    display: flex;
    align-items: center;
  }
</style>
