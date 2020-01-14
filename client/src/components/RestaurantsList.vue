<template>
  <div>
    <div class="restaurants-list-container">
      <restaurant-list-item
        v-for="(restaurant, index) in this.restaurantsList"
        v-bind:key="restaurant.restaurant_id"
        :restaurant="restaurant"
        :index="index"
      />
    </div>
  </div>
</template>

<script>
  import RestaurantListItem from './RestaurantListItem';

  export default {
    name: 'RestaurantsList',
    components: { RestaurantListItem },
    props: {
      fetchRestaurantsPage: Number,
      fetchRestaurantsNbPerPage: Number,
      fetchRestaurantsNameSearch: String
    },
    mounted() {
      if (this.$route.params.fetch !== 'no') {
        this.fetchRestaurantsList();
      }
    },
    computed: {
      restaurantsList() {
        return this.$store.getters['restaurants/restaurantsList'];
      }
    },
    methods: {
      fetchRestaurantsList() {
        this.$store.dispatch('restaurants/fetchRestaurants', {
          page: this.fetchRestaurantsPage,
          pageSize: this.fetchRestaurantsNbPerPage,
          name: this.fetchRestaurantsNameSearch
        })
      }
    },
    watch: {
      fetchRestaurantsPage() {
        this.fetchRestaurantsList();
      },
      fetchRestaurantsNbPerPage() {
        this.fetchRestaurantsList();
      },
      fetchRestaurantsNameSearch() {
        this.fetchRestaurantsList();
      }
    }
  }
</script>

<style scoped>
  .restaurants-list-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
