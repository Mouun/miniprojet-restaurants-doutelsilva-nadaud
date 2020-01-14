<template>
  <div class="home-container">
    <md-icon class="md-size-3x">restaurant</md-icon>
    <div class="aligned-text">
      <h1>Bienvenue sur l'application Restaurants</h1>
      <h3>Sur celle-ci, vous trouverez les fonctionnalités suivantes :</h3>
      <ul>
        <li>Système d'authentification</li>
        <li>Affichage et recherche d'un restaurant</li>
        <li>Consultation des plats et menus d'un restaurant</li>
        <li>Création d'une commande <span class="primary-colored-text">(disponible en mode connecté uniquement)</span></li>
        <li>Ajout et modification d'un restaurant <span class="primary-colored-text">(disponible en mode admin uniquement)</span></li>
      </ul>
      <md-button to="/restaurants" class="md-raised md-primary">ACCÉDER AUX RESTAURANTS</md-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style scoped>
  .home-container {
    text-align: center;
  }

  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 6px;
  }

  .primary-colored-text {
    font-weight: bold;
    color: var(--md-theme-default-primary)
  }
</style>
