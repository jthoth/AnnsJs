const nj = require('numjs');


class NeuralNetwork{

  constructor(architecture, initializer, activation, cost){
    this.architecture = architecture
    this.func = activation
    this.cost = cost
    this.n_layers = architecture.length
    this.W = {}, this.b = {}, this.activations = {}
    this.weigthInitialization(architecture, initializer)
  }

  weigthInitialization(architecture, initializer){
    for (let l = 0; l < this.n_layers - 1; l++) {
      let shape = [architecture[l], architecture[l + 1]]
      let generator = new initializer(shape)
      this.W[l] = generator.generate()
      this.b[l] = nj.zeros(shape[1])
    }
  }

  generateDrawer(){
    let dataVisualNet = [['f(x)', 'W', 'w']]
    for (let l = 1; l < this.n_layers; l++) {
      for (var i = 0; i < this.architecture[l - 1]; i++) {
        for (var j = 0; j < this.architecture[l]; j++) {
          dataVisualNet.push([`L${l}(${i})`, `L${l + 1}(${j})`,
            Math.abs(this.W[l - 1].get(i, j))])
        }
      }
    }
    return dataVisualNet
  }

  addBiases(activation, layer){
    let activationBiases =[];
    activation.iteraxis(0, (a) => {
        activationBiases.push(nj.add(a, this.b[layer]))
    })
    return nj.stack(activationBiases);
  }

  forward(activation){
    this.activations[0] = activation
    for (let i = 1; i < this.n_layers; i++) {
      activation = this.addBiases(nj.dot(activation, this.W[i - 1]), i - 1)
      activation = this.func.forward(activation)
      this.activations[i] = activation
    }
    return activation
  }

  getInvActivatio(l){
    return this.activations[this.n_layers + l]
  }

  backwardLayer(l, output){
    const deltaFunc = this.func.backward(this.getInvActivatio(l))
    return nj.multiply(output, deltaFunc)
  }

  computeDeltaWeithts(delta, l, lr){
    let w = this.getInvActivatio(-l).transpose().dot(delta)
    return nj.multiply(w, lr)
  }

  updateWeights(delta, l, lr){
    let w = this.computeDeltaWeithts(delta, l, lr)
    this.W[this.n_layers - l] = nj.add(this.W[this.n_layers - l], w)
    delta.iteraxis(0, (a) => {
        this.b[this.n_layers - l] = nj.add(this.b[this.n_layers - l], a)
    })
  }

  backward(output, delta, lr){
    for (let l = 2; l < this.n_layers + 1; l++) {
      output = delta.dot(this.W[this.n_layers - l].transpose())
      this.updateWeights(delta, l, lr)
      delta = this.backwardLayer(-l, output)
    }
  }

  gradientDescend(X, y, lr=0.1){
    let output = this.cost.backward(y ,  this.forward(X))
    let delta = this.backwardLayer(-1, output)
    this.backward(output, delta, lr)
    return nj.mean(nj.abs(delta))
  }

  validate(X, y){
    let accuracy = 0
    let output = this.cost.forward(y ,  this.forward(X)).tolist()
    let Y = y.tolist()
    for (let i = 0; i < Y.length; i++) {
      if(Y[i].indexOf(Math.max(...Y[i])) == output[i].indexOf(Math.max(...output[i])))
        accuracy++;
    }
    return Math.round((accuracy/Y.length) * 100)
  }

}


module.exports = {
  NeuralNetwork
}
