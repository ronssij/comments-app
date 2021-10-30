import Vue from "vue";
import Vuex from "vuex";
import Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: null,
  },

  getters: {
    getUsername(state) {
      return state.username ?? Cookies.get("username");
    },
  },

  mutations: {
    setUsernameState(state, value) {
      Cookies.set("username", value);

      state.username = value;
    },
  },
});
