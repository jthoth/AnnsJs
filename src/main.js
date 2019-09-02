import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './app-router'
import { store } from './store/store'
import VoerroTagsInput from '@voerro/vue-tagsinput'


Vue.config.productionTip = false
Vue.component('tags-input', VoerroTagsInput)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
