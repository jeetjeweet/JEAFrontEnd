// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import axios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import NavBar from "@/components/NavBar";
import interceptor from "@/components/interceptor";

interceptor();
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.component('NavBar', NavBar);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
