<template>
  <div class="restaurants-container">
    <div class="title-filters-icon">
      <div class="nb-restaurants">
        <h1>Restaurants</h1>
      </div>
      <div class="spacer"></div>
      <md-button @click="showFilters = !showFilters" class="md-icon-button">
        <md-icon>filter_list</md-icon>
        <md-tooltip>Filtrer les restaurants</md-tooltip>
      </md-button>
    </div>
    <div v-if="showFilters" class="filters-container">
      <md-field>
        <label>Rechercher un restaurant (nom, cuisine, ville)</label>
        <md-input v-debounce:300ms="changeRestaurantNameSearch"/>
        <md-icon>search</md-icon>
      </md-field>
      <label class="pure-material-slider">
        <input type="range" min=5 max=100 step=5 v-model.number="fetchRestaurantsNbPerPage"/>
        {{fetchRestaurantsNbPerPage}} restaurants par page
      </label>
    </div>
    <div class="page-selector-container">
      <md-button v-if="fetchRestaurantsPage > 0" @click="fetchRestaurantsPage--" class="md-icon-button">
        <md-icon>arrow_back</md-icon>
        <md-tooltip>Page précédente</md-tooltip>
      </md-button>
      <div class="spacer"></div>
      <md-button @click="fetchRestaurantsPage++" class="md-icon-button next-arrow-icon">
        <md-icon>arrow_forward</md-icon>
        <md-tooltip>Page suivante</md-tooltip>
      </md-button>
    </div>
    <restaurants-list
      :fetch-restaurants-page="fetchRestaurantsPage"
      :fetch-restaurants-nb-per-page="fetchRestaurantsNbPerPage"
      :fetch-restaurants-name-search="fetchRestaurantsNameSearch"
    />
  </div>
</template>

<script>
  import RestaurantsList from '../components/RestaurantsList';
  export default {
    name: 'Restaurants',
    data() {
      return {
        showFilters: false,
        fetchRestaurantsPage: 0,
        fetchRestaurantsNbPerPage: 10,
        fetchRestaurantsNameSearch: ''
      }
    },
    computed: {
      nbRestaurants() {
        return this.$store.getters['restaurants/restaurantsList'].length;
      }
    },
    methods: {
      changeRestaurantNameSearch(val) {
        this.fetchRestaurantsNameSearch = val;
      }
    },
    components: { RestaurantsList }
  }
</script>

<style scoped>
  .restaurants-container {
    width: 60%;
    margin: auto;
  }

  .title-filters-icon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .nb-restaurants {
    display: flex;
  }

  .nb-restaurants span {
    margin-bottom: 12px;
  }

  .spacer {
    flex: 1;
  }

  .filters-container {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
  }

  .page-selector-container {
    display: flex;
    flex-direction: row;
  }
</style>
