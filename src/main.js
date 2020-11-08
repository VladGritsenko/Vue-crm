import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.use(Antd);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: "AIzaSyCYwMCBiN-I4uLHYMxCMWarFTNUV0sjudM",
  authDomain: "vue-crm-e493b.firebaseapp.com",
  databaseURL: "https://vue-crm-e493b.firebaseio.com",
  projectId: "vue-crm-e493b",
  storageBucket: "vue-crm-e493b.appspot.com",
  messagingSenderId: "76177147760",
  appId: "1:76177147760:web:afe956c0231218c40f31b5",
  measurementId: "G-8PLBLZS87D"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
