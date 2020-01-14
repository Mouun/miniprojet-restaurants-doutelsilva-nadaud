<template>
  <md-card class="md-elevation-0">
    <md-card-expand>
      <md-card-actions md-alignment="space-between">
        <div>
          <h2>Menu {{menuNumber}}</h2>
        </div>

        <md-card-expand-trigger>
          <md-button class="md-icon-button">
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-expand-trigger>
      </md-card-actions>

      <md-card-expand-content>
        <md-card-content>
          <md-list>
            <md-list-item v-if="menu.entree !== ''">
              <b>Entrée</b>
              <span>{{menu.entree}}
                <md-icon v-if="menu.entree_info !== ''">
                  info
                  <md-tooltip>{{menu.entree_info}}</md-tooltip>
                </md-icon>
              </span>
            </md-list-item>
            <md-list-item>
              <b>Plat principal</b>
              <span> {{menu.plat_principal}}
                <md-icon v-if="menu.plat_info !== ''">
                  info
                  <md-tooltip>{{menu.plat_info}}</md-tooltip>
                </md-icon>
              </span>
            </md-list-item>
            <md-list-item v-if="menu.garniture !== ''">
              <b>Accompagnement</b>
              <span> {{menu.garniture}}
                <md-icon v-if="menu.garniture_info !== ''">
                  info
                  <md-tooltip>{{menu.garniture_info}}</md-tooltip>
                </md-icon>
              </span>
            </md-list-item>
            <md-list-item>
              <b>Dessert</b>
              <span> {{menu.dessert}}
                <md-icon v-if="menu.dessert_info !== ''">
                  info
                  <md-tooltip>{{menu.dessert_info}}</md-tooltip>
                </md-icon>
              </span>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-card-expand-content>
    </md-card-expand>
  </md-card>
</template>

<script>
  export default {
    name: 'RestaurantMenu',
    props: {
      menuNumber: Number,
      menu: Object
    }
  }
</script>

<style scoped>

</style>
