import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth';
import auth from './resources/auth';
import ViewUI from 'view-design';
import Toasted from 'vue-toasted';
import 'view-design/dist/styles/iview.css';
import '../node_modules/material-icons/iconfont/material-icons.css';
import 'es6-promise/auto'
import moment from 'moment'
import TurnOffAutocomplete from 'vue-turn-off-autocomplete';

Axios.defaults.headers.version = '1.0';
Axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.prototype.$http = Axios;
Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.router = router
Vue.use(VueRouter)
Vue.use(ViewUI);
Vue.use(VueAxios, Axios)
Vue.use(VueAuth, auth);
Vue.use(Toasted)
Vue.use(TurnOffAutocomplete);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
