import Vue from 'vue'
import VueRouter from 'vue-router'
import MainNeuralNet from './components/MainNeuralNet'

Vue.use(VueRouter)


const routes = [
  { path: '/', component:  MainNeuralNet },
  { path: '/algorithms', component: MainNeuralNet },
  { path: '/programming', component: MainNeuralNet },
  { path: '/evolution', component: MainNeuralNet },
  { path: '/about', component: MainNeuralNet },
]

export default new VueRouter({
  routes
});
