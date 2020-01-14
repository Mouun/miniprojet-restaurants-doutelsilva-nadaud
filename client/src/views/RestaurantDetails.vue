<template>
  <div class="restaurant-details-container">
    <div class="back-button-restaurant-name-container">
      <md-button @click="goBack" class="md-icon-button">
        <md-icon>arrow_back</md-icon>
        <md-tooltip>Retour à la liste des restaurants</md-tooltip>
      </md-button>
      <h1>{{restaurant.name}}</h1>
    </div>
    <div class="restaurant-subhead-info">
      <div class="stars">
        <star-rating
          :rating="averageGrade"
          :increment="0.5"
          :rounded-corners="true"
          :star-size="24"
          active-color="#448aff"
          inactive-color="#212121"
          :show-rating="false"
          :read-only="true"
        />
      </div>
      <span>{{restaurant.grades.length}} notes</span>
      <div class="spacer"></div>
      <span>{{restaurant.prix_min}}€ - {{restaurant.prix_max}}€</span>
      <div class="spacer"></div>
      <span>{{restaurant.cuisine}}</span>
    </div>
    <div class="restaurant-additionnal-info">
      <md-icon class="info-icon">room</md-icon>
      <span>{{restaurant.address.building}} {{restaurant.address.street}}, {{restaurant.address.zipcode}} {{restaurant.borough}}</span>
      <div class="spacer"></div>
      <md-icon class="info-icon">phone</md-icon>
      <span>{{restaurant.tel}}</span>
      <div class="spacer"></div>
      <md-icon class="info-icon">schedule</md-icon>
      <span><b>Ouvert: </b>{{restaurant.heure_ouverture}}:00 - {{restaurant.heure_fermeture}}:00</span>
    </div>
    <restaurant-images
      :thumbnail-image="restaurant.thumbnail"
      :additionnal-pictures="restaurant.review_pictures"
    />
    <div class="restaurant-details-bottom-container">
      <restaurant-grades
        :average-grade="averageGrade"
        :grades="restaurant.grades"
        :max-grade="maxGrade"
      />
      <restaurant-info
        :price-min="restaurant.prix_min"
        :price-max="restaurant.prix_max"
        :cuisine="restaurant.cuisine"
      />
      <restaurant-coords
        :address="restaurant.address"
        :full-address="restaurant.address.building + ' ' + restaurant.address.street + ',' + restaurant.address.zipcode + ' ' + restaurant.borough"
        :tel="restaurant.tel"
      />
    </div>
    <div class="restaurant-menus-container">
      <md-card class="md-elevation-0">
        <md-card-header>
          <div class="md-title">Menus</div>
        </md-card-header>
        <md-content>
          <div class="menus-inner-container">
            <restaurant-menu
              v-for="(menu, index) in menus"
              v-bind:key="menu._id"
              :menu-number="index + 1"
              :menu="menu"
            />
          </div>
        </md-content>
      </md-card>
    </div>
    <md-button
      v-if="isLoggedIn"
      @click="showDialog = true"
      class="md-raised md-primary"
      style="float: right; margin-top: 24px; margin-bottom: 24px"
    >
      COMMANDER À LA CARTE
    </md-button>

    <div>
      <md-dialog :md-active.sync="showDialog" :md-close-on-esc="false" :md-click-outside-to-close="false">
        <md-dialog-title>Choisir une entrée, un plat et un dessert</md-dialog-title>
        <md-tabs md-dynamic-height>
          <md-tab md-label="Entrée">
            <md-radio v-for="entree in entrees" v-bind:key="entree._id" v-model="selectedEntree" :value="entree.nom" class="md-primary">{{entree.nom}}</md-radio>
          </md-tab>

          <md-tab md-label="Plat">
            <md-radio v-for="plat in plats" v-bind:key="plat._id" v-model="selectedPlat" :value="plat.principal" class="md-primary">{{plat.principal}}</md-radio>
          </md-tab>

          <md-tab md-label="Dessert">
            <md-radio v-for="dessert in desserts" v-bind:key="dessert._id" v-model="selectedDessert" :value="dessert.nom" class="md-primary">{{dessert.nom}}</md-radio>
          </md-tab>
        </md-tabs>

        <div class="recap-order">
          <h3>Récapitulatif de la commande</h3>
          <ul>
            <li><b>Entrée : </b><span v-if="selectedEntree === ''">pas encore selectionnée</span><span v-else>{{selectedEntree}}</span></li>
            <li><b>Plat : </b><span v-if="selectedPlat === ''">pas encore selectionné</span><span v-else>{{selectedPlat}}</span></li>
            <li><b>Dessert : </b><span v-if="selectedDessert === ''">pas encore selectionné</span><span v-else>{{selectedDessert}}</span></li>
          </ul>
        </div>

        <span v-if="showError" class="error">Veuillez sélectionner une entrée, un plat et un dessert.</span>

        <md-dialog-actions>
          <md-button class="md-primary" @click="closeDialog">ANNULER</md-button>
          <md-button class="md-primary" @click="order">COMMANDER</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
  import StarRating from 'vue-star-rating'
  import RestaurantImages from '../components/RestaurantImages';
  import RestaurantCoords from '../components/RestaurantCoords';
  import RestaurantInfo from '../components/RestaurantInfo';
  import RestaurantGrades from '../components/RestaurantGrades';
  import Axios from 'axios'
  import RestaurantMenu from '../components/RestaurantMenu';

  export default {
    name: 'RestaurantDetails',
    components: {
      RestaurantMenu,
      RestaurantGrades,
      RestaurantInfo,
      RestaurantCoords,
      RestaurantImages,
      StarRating
    },
    props: {
      restaurant: {},
      restaurantId: null
    },
    data() {
      return {
        showDialog: false,
        showError: false,
        selectedEntree: '',
        selectedPlat: '',
        selectedDessert: '',
        menus: [],
        entrees: [],
        plats: [],
        desserts: []
      }
    },
    beforeRouteEnter(to, from, next) {
      const formDataMenus = new FormData();
      const formDataEntrees = new FormData();

      for (let i = 0; i < to.params.restaurant.menus.length; i++) {
        formDataMenus.append('ids[]', to.params.restaurant.menus[i]);
      }
      for (let i = 0; i < to.params.restaurant.entrees.length; i++) {
        formDataEntrees.append('ids[]', to.params.restaurant.entrees[i]);
      }

      const getMenus = () => {
        return Axios.post('https://filipedoutelsilva.com/api/nourriture/menus',
          formDataMenus,
          { headers: { 'Content-Type': 'multipart/form-data' } });
      };
      const getEntrees = () => {
        return Axios.post('https://filipedoutelsilva.com/api/nourriture/entrees',
          formDataEntrees,
          { headers: { 'Content-Type': 'multipart/form-data' } });
      };
      const getPlats = () => {
        return Axios.get('https://filipedoutelsilva.com/api/nourriture/plats');
      };
      const getDesserts = () => {
        return Axios.get('https://filipedoutelsilva.com/api/nourriture/desserts');
      };

      Axios.all([getMenus(), getEntrees(), getPlats(), getDesserts()])
      .then((response) => {
        next(vm => vm.setMenusEntreesPlatsDesserts(response));
      });
    },
    computed: {
      username() {
        return this.$store.getters['user/username'];
      },
      isLoggedIn() {
        return this.$store.getters['user/isLoggedIn'];
      },
      averageGrade() {
        let total = 0;
        let maxNote = 0;
        this.restaurant.grades.forEach((grade) => {
          total += grade.score;
          if (grade.score > maxNote) maxNote = grade.score;
        });
        return Math.round(((5 * (total / this.restaurant.grades.length)) / maxNote) * 2) / 2;
      },
      maxGrade() {
        let maxNote = 0;
        this.restaurant.grades.forEach((grade) => {
          if (grade.score > maxNote) maxNote = grade.score;
        });
        return maxNote;
      }
    },
    methods: {
      goBack() {
        this.$router.push({ name: 'restaurants', params: { fetch: 'no' } })
      },
      setMenusEntreesPlatsDesserts(payload) {
        this.menus = payload[0].data.payload;
        this.entrees = this.getUniquesFromArray(payload[1].data.payload, 'nom');
        this.plats = this.getUniquesFromArray(payload[2].data.payload, 'principal');
        this.desserts = this.getUniquesFromArray(payload[3].data.payload, 'nom');
      },
      closeDialog() {
        this.showDialog = false;
        this.showError = false;
        this.selectedEntree = '';
        this.selectedPlat = '';
        this.selectedDessert = '';
      },
      order() {
        if (this.selectedEntree !== '' && this.selectedPlat !== '' && this.selectedDessert !== '') {
          Axios.post('https://filipedoutelsilva.com/api/order', {
            username: this.username,
            order: {
              entree: this.selectedEntree,
              plat: this.selectedPlat,
              dessert: this.selectedDessert
            }
          }).then((response) => {
            console.log(response);
            this.showDialog = false;
            this.selectedEntree = '';
            this.selectedPlat = '';
            this.selectedDessert = '';
          }).catch(err => console.log(err.message));
        } else {
          this.showError = true;
        }
      },
      getUniquesFromArray(array, comp) {
        return array
        .map(e => e[comp])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => array[e])
        .map(e => array[e])
        .filter(e => e.nom !== '');
      }
    }
  }
</script>

<style scoped>
  .back-button-restaurant-name-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .restaurant-details-container {
    width: 60%;
    margin: auto;
  }

  .restaurant-subhead-info {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .restaurant-additionnal-info {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  .restaurant-additionnal-info span {
    font-size: 14pt;
  }

  .info-icon {
    color: var(--md-theme-default-primary) !important;
    display: contents;
  }

  i + span {
    margin-left: 8px;
  }

  .stars {
    margin-right: 8px;
  }

  .restaurant-subhead-info span {
    font-size: 14pt;
  }

  .restaurant-details-bottom-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
  }

  .restaurant-details-bottom-container .md-card {
    flex: 1;
  }

  .restaurant-details-bottom-container .md-card:nth-child(2) {
    margin-left: 16px;
    margin-right: 16px;
  }

  .restaurant-menus-container {
    margin-top: 24px;
  }

  .menus-inner-container {
    padding-left: 12px;
    padding-right: 12px;
  }

  .md-radio {
    display: flex;
  }

  .recap-order {
    padding-left: 16px;
    padding-right: 16px;
  }

  .recap-order ul {
    list-style-type: none;
    padding-inline-start: 16px !important;
  }

  .error {
    padding-left: 16px;
    padding-right: 16px;
    color: #ff1744;
  }

  .spacer {
    margin-left: 16px;
    margin-right: 16px;
    background-color: rgb(110, 110, 110);
    height: 20px;
    width: 1px;
  }
</style>
