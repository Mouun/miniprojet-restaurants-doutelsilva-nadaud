<template>
  <div class="restaurant-item-card">
    <md-card>
      <md-card-media-cover>
        <md-card-media>
          <img :src="restaurant.thumbnail" alt="restaurant-thumbnail">
        </md-card-media>

        <md-card-area v-if="isLoggedIn">
          <md-card-actions>
            <md-button @click="deleteRestaurant" class="md-raised md-primary">SUPPRIMER</md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>

      <md-card-header>
        <div class="md-title">{{restaurant.name}}</div>
        <div class="md-subhead">{{restaurant.cuisine}}</div>
      </md-card-header>

      <md-card-content>
        <span class="description-text">{{restaurant.description}}</span>
      </md-card-content>

      <md-card-actions>
        <md-button @click="navigateToDetails">PLUS DE DÉTAILS</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'RestaurantListItem',
    props: {
      restaurant: Object,
      index: Number
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters['user/isLoggedIn'];
      }
    },
    methods: {
      navigateToDetails() {
        const restaurantId = this.restaurant.restaurant_id;
        this.$router.push({ name: 'restaurant-details', params: { restaurantId: restaurantId, restaurant: this.restaurant } });
      },
      deleteRestaurant() {
        this.$store.dispatch('restaurants/deleteRestaurant', { restaurantId: this.restaurant._id, index: this.index })
      }
    }
  }
</script>

<style scoped>
  .restaurant-item-card {
    width: calc(33% - 32px);
    margin: 16px;
  }

  .md-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .md-subhead {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description-text {
    height: 88px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
