// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';
import App from './App';
import router from './router';
import {store} from './store/store';
import swal from 'sweetalert';
import Multiselect from 'vue-multiselect'

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

