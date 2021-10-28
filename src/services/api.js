import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import env from "./env";

const api = axios.create({
  baseURL: env.apiUrl,
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.request !== undefined && error.request.status === 401) {
      error.config.__isRetryRequest = true;

      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);

Vue.prototype.$api = api;
Vuex.Store.prototype.$api = api;

export default api;
