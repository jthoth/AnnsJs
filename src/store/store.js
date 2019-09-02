import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import {Data, NormSelector} from '../data/loader'
import {InitSelector} from '../anns/initialization'
import {NeuralNetwork} from '../anns/neuralNetwork'
import {ActivationSelector} from '../anns/activationFunction'
import {CostSelector} from '../anns/costfuncs'

// import {ActivationSelector} from '../anns/factivations'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    url: null,
    connections:[],
    net: null,
    normalization: 'maxMinNorm',
    initialization: 'Normal',
    activation: 'Relu',
    cost: 'SquareError',
    lr: 0.1,
    epochs: 0,
    data: null,
    hiddens:[],
    metrics:[0, 0],
  },
  mutations: {
    updateUrl(state, url_) {
      state.url = url_
    },
    updateNormMethod(state, normalization_) {
      state.normalization = normalization_
    },
    updateInitMethod(state, initialization_) {
      state.initialization = initialization_
    },
    updateActMethod(state, activation_) {
      state.activation = activation_
    },
    updateCostMethod(state, cost_) {
      state.cost = cost_
    },
    updateNeuralNet(state, net_) {
      state.net = net_
    },
    updateConnections(state, connections_) {
      state.connections = connections_
    },
    updateHiddens(state, hiddens_) {
      state.hiddens = hiddens_
    },
    updateData(state, data_) {
      state.data = data_
    },
    updateLearningRate(state, lr_) {
      state.lr = lr_
    },
    updateEpochs(state, epochs_) {
      state.epochs = epochs_
    },
    updateMetrics(state, metrics_) {
      state.metrics = metrics_
    }
  },
  actions:{
    async loadData({commit, state}){
      const response = await axios.get(state.url)
      let data = new Data(response.data, NormSelector.get(state.normalization))
      commit('updateData', data.get())
      commit('updateHiddens', [{ key: '', value: state.data[0].shape[1] + 2 }])
    },
    async updateVisorNeuralNet({commit, state}){
      let architecture = state.hiddens.map(x => parseInt(x.value))
      architecture.unshift(state.data[0].shape[1])
      architecture.push(state.data[2].shape[1])
      let neuralNetwork = new NeuralNetwork(architecture,
         InitSelector.get(state.initialization),
         ActivationSelector.get(state.activation),
         CostSelector.get(state.cost))
      commit('updateNeuralNet', neuralNetwork)
      commit('updateConnections', neuralNetwork.generateDrawer())
    },
    async trainNeuralNet({commit, state}){
      state.net.gradientDescend(state.data[0], state.data[2], state.lr)
      commit('updateConnections', state.net.generateDrawer())
      let trainAcc = state.net.validate(state.data[0], state.data[2])
      let testAcc = state.net.validate(state.data[1], state.data[3])
      commit('updateMetrics', [trainAcc, testAcc])
      commit('updateEpochs', state.epochs + 1)
    },
    async testNeuralNet({commit, state}){
      let trainAcc = state.net.validate(state.data[0], state.data[2])
      let testAcc = state.net.validate(state.data[1], state.data[3])
      commit('updateMetrics', [trainAcc, testAcc])
    }
  }
  ,
  getters: {
    connections: state => state.connections,
    url: state => state.url,
    hiddens: state => state.hiddens,
    data: state => state.data,
    metrics: state => state.metrics,
    epochs: state => state.epochs,
  }
})
