import Vue from 'vue'
import Vuex from 'vuex'
import Requests from "./modules/requests";
import UserInfos from "./modules/userInfos";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Requests,
    UserInfos
  }
})
