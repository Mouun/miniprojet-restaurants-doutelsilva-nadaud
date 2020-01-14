import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Secured from '../views/Secured.vue';
import SignIn from '../views/SignIn.vue';
import Register from '../views/Register.vue';
import Restaurants from '../views/Restaurants.vue';
import store from '../store/index'
import RestaurantDetails from '../views/RestaurantDetails';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register
  },
  {
    path: '/secured',
    name: 'secured',
    component: Secured,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurant/:restaurantId',
    name: 'restaurant-details',
    component: RestaurantDetails,
    props: true
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('signin');
  } else {
    next();
  }
});

export default router
