import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDebounce from 'vue-debounce'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import 'nprogress/nprogress.css'

Vue.use(VueDebounce);
Vue.use(VueMaterial);
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
