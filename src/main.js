import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Routes from './routes'
import {firestorePlugin} from "vuefire";

Vue.use(VueRouter)
Vue.use(firestorePlugin)

const router = new VueRouter({
  routes: Routes
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router: router
}).$mount('#app')
