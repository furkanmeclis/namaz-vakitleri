import Vue from 'vue'
import App from './App.vue'
import {router} from "./router"
import cook from './cookie'
import store from "./store/store";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  cook,
  render: h => h(App),
}).$mount('#app')
