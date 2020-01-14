<template>
  <md-card class="md-elevation-0">
    <md-card-header>
      <div class="md-title">Coordonnées</div>
    </md-card-header>
    <md-card-content>
      <div class="map">
        <MglMap
          :zoom="14"
          :center="{ lon: address.coord[0], lat: address.coord[1] }"
          :accessToken="mapboxAccessToken"
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <MglMarker
            :coordinates="[address.coord[0], address.coord[1]]"
            color="#448aff"
          />
        </MglMap>
      </div>
      <div class="restaurant-coords-bottom-container">
        <div>
          <md-icon class="coord-icons">room</md-icon>
          <span>{{fullAddress}}</span>
        </div>
        <div>
          <md-icon class="coord-icons">phone</md-icon>
          <span>{{tel}}</span>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
  import { mapboxAccessToken } from '../config';
  import Mapbox from 'mapbox-gl';
  import { MglMap, MglMarker } from 'vue-mapbox';

  export default {
    name: 'RestaurantCoords',
    components: { MglMap, MglMarker },
    data() {
      return {
        mapboxAccessToken: mapboxAccessToken
      }
    },
    created() {
      this.mapbox = Mapbox;
    },
    props: {
      address: Object,
      fullAddress: String,
      tel: String
    }
  }
</script>

<style scoped>
  .map {
    height: 20vh;
    margin-bottom: 18px;
  }

  .restaurant-coords-bottom-container div:nth-child(2) {
    margin-top: 8px;
  }

  .coord-icons {
    color: var(--md-theme-default-primary) !important;
    margin-right: 8px;
  }
</style>
