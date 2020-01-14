<template>
  <md-card class="md-elevation-0">
    <md-card-header>
      <div class="md-title">Détails</div>
    </md-card-header>
    <md-card-content class="info">
      <span class="section-text">Fourchette de prix</span>
      <p>{{priceMin}}€ - {{priceMax}}€</p>
      <span class="section-text">Cuisine(s)</span>
      <p>{{cuisine}}</p>
    </md-card-content>
  </md-card>
</template>

<script>
  export default {
    name: 'RestaurantInfo',
    props: {
      priceMin: Number,
      priceMax: Number,
      cuisine: String
    }
  }
</script>

<style scoped>
  .section-text {
    font-size: 1.1em;
    font-weight: bold;
  }
</style>
