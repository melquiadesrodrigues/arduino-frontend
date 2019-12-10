import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from 'vue-router-prefetch'
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'Content-Type';
// import

Vue.use(BlackDashboard);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
