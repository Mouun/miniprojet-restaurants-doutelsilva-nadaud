import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../axios-common'

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    authenticated: JSON.parse(localStorage.getItem('authenticated')) || false,
    username: localStorage.getItem('username') || null
  },
  mutations: {
    authSuccess(state, payload) {
      console.log(payload.user);
      state.status = 'success';
      state.authenticated = payload.authenticated;
      state.username = payload.user.username;
    },
    logout(state) {
      state.status = '';
      state.authenticated = false;
    }
  },
  actions: {
    signIn({ commit }, formResult) {
      return new Promise((resolve, reject) => {
        Axios.post('connection', {
          username: formResult.username,
          mdp: formResult.password
        }).then((response) => {
          if (response.status === 200) {
            commit('authSuccess', { authenticated: true, user: response.data.payload });
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('username', response.data.payload.username);
            resolve(response.data.payload);
          }
        }).catch((err) => reject(err));
      })
    },
    signUp({ commit }, formResult) {
      return new Promise((resolve, reject) => {
        Axios.post('creationcompte', {
          username: formResult.username,
          mdp: formResult.password
        }).then((response) => {
          if (response.status === 200) {
            resolve(response.data.payload);
          }
        }).catch((err) => reject(err));
      })
    },
    signOut({ commit }) {
      return new Promise((resolve) => {
        commit('logout');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.authenticated,
    username: state => state.username
  }
};

const restaurants = {
  namespaced: true,
  state: {
    restaurantsList: [],
    restaurantsCount: 0
  },
  mutations: {
    fetchedRestaurants(state, { restaurants, count }) {
      state.restaurantsList = restaurants;
      state.restaurantsCount = count;
    },
    removeRestaurant(state, { index }) {
      state.restaurantsList.splice(index, 1);
    }
  },
  actions: {
    fetchRestaurants({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        Axios.get('restaurants', {
          params: {
            page: queryParams.page,
            pagesize: queryParams.pageSize,
            name: queryParams.name
          }
        }).then(response => {
          commit('fetchedRestaurants', { restaurants: response.data.payload, count: response.data.message });
          resolve(response);
        }).catch(err => {
          reject(err);
        })
      })
    },
    deleteRestaurant({ commit }, payload) {
      return new Promise((resolve, reject) => {
        console.log('restoId', payload.restaurantId);
        Axios.delete(`restaurants/${payload.restaurantId}`).then((response) => {
          commit('removeRestaurant', { index: payload.index });
          resolve(response);
        }).catch(err => reject(err));
      })
    }
  },
  getters: {
    restaurantsList: state => state.restaurantsList
  }
};

export default new Vuex.Store({
  modules: {
    user,
    restaurants
  }
});
