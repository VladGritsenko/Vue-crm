import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth';
import userInfo from './userInfo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const data = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UAH,RUB`);
      return data.json();
    }
  },
  modules: {
    auth, userInfo
  }
})
