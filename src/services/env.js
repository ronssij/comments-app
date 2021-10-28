import Vue from "vue";

const env = {
  apiUrl: process.env.VUE_APP_API_URL,
};

Vue.prototype.$env = env;

export default env;
