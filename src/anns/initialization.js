const nrand = require('random-normal')
const { random } = require('mathjs')
const nj = require('numjs')

class Scale {

  constructor(shape, scale){
    this.__shape = shape
    this.__scale = scale
    this.options = {
      'avg': this.compute_avg,
      'in': this.compute_in,
      'out': this.compute_out
    }
  }

  compute_avg(self){
    return self.__scale / (self.__shape[0] + self.__shape[1])
  }

  compute_in(self){
    return self.__scale / self.__shape[0]
  }

  compute_out(self){
    return self.__scale / self.__shape[1]
  }

  get(type){
    return this.options[type](this)
  }

}

class Uniform extends Scale {
  /* Understanding the difficulty of training deep feedforward neural networks */

  constructor(shape, scale=1){
    super(shape, scale)
  }

  buildWeights(scale){
    let W = nj.zeros(this.__shape)
    for (var i = 0; i < this.__shape[0]; i++) {
      for (var j = 0; j < this.__shape[1]; j++)
        W.set(i, j, random(-scale, scale))
    }
    return W
  }

  generate(){
    let scale = Math.sqrt(this.get('avg')) * 3
    return this.buildWeights(scale)
  }

}


class Normal extends Scale {

  constructor(shape, scale=1){
    super(shape, scale)
  }

  buildWeights(scale){
    let W = nj.zeros(this.__shape)
    for (var i = 0; i < this.__shape[0]; i++) {
      for (var j = 0; j < this.__shape[1]; j++)
        W.set(i, j, nrand({mean: 0, dev: scale}))
    }
    return W
  }

  generate(){
    let scale = Math.sqrt(this.get('in')) / .87962566103423978
    return this.buildWeights(scale)
  }
}

class Constant {

  constructor(shape, value=0.1){
    this.__shape = shape
    this.__value = value
  }

  buildWeights(){
    let W = nj.zeros(this.__shape)
    for (var i = 0; i < this.__shape[0]; i++) {
      for (var j = 0; j < this.__shape[1]; j++)
        W.set(i, j, this.__value)
    }
    return W
  }

  generate(){
    return this.buildWeights()
  }
}

class InitSelector{
  static get(name){
    let options = {'Uniform':Uniform,
    'Normal':Normal};
    return options[name]
  }
}

module.exports = {
  Uniform,
  Normal,
  Constant,
  InitSelector
}
