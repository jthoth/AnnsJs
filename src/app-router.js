import Vue from 'vue'
import VueRouter from 'vue-router'
import MainNeuralNet from './components/MainNeuralNet'
import GeneticAlgorithm from './components/GeneticAlgorithm'
import GeneticProgramming from './components/GeneticProgramming'
import Neuroevolution from './components/Neuroevolution'
import About from './components/About'

Vue.use(VueRouter)


const routes = [
  { path: '/', component:  MainNeuralNet },
  { path: '/algorithms', component: GeneticAlgorithm },
  { path: '/programming', component: GeneticProgramming },
  { path: '/evolution', component: Neuroevolution },
  { path: '/about', component: About },
]

export default new VueRouter({
  routes
});
