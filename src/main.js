import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import Vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import Auth from './config/Auth';
import ViewUI from 'view-design';
import Toasted from 'vue-toasted';
import Moment from 'moment';
import 'view-design/dist/styles/iview.css';
import '../node_modules/material-icons/iconfont/material-icons.css';
import 'es6-promise/auto';

const appUrl =
  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000/' :
    'https://api.benjamin-hartmann.fr/';

Axios.defaults.headers.version = '1.0';
Axios.defaults.baseURL = appUrl;
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.prototype.$http = Axios;
Vue.prototype.moment = Moment;
Vue.prototype.$appUrl = appUrl;
Vue.config.productionTip = false;
Vue.router = Router;

Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(VueAxios, Axios);
Vue.use(VueAuth, Auth);
Vue.use(Toasted);

const app = new Vue({
  router: Router,
  store: Store,
  vuetify: Vuetify,
  render: (h) => h(App),
}).$mount('#app');

if (window.Cypress) {
  window.app = app;
}
