const nj = require('numjs')


class Step{
  static forward(z){
    return nj.clip(z, 0, 1)
  }

  static backward(delta){
    return nj.multiply(delta, 0)
  }
}

class Sigmoid{

  static forward(z){
    const denomitor = nj.add(nj.exp(nj.negative(z)), 1)
    return nj.divide(nj.ones(z.shape), denomitor)
  }

  static backward(delta){
    const sigmoid = Sigmoid.forward(delta)
    return nj.multiply(sigmoid,
      nj.subtract(nj.ones(delta.shape), sigmoid))
  }
}

class Tanh{

  static forward(z){
    const pbase = nj.exp(z)
    const nbase = nj.exp(nj.negative(z))
    return nj.divide(nj.subtract(pbase, nbase),
      nj.add(pbase, nbase)
    )
  }

  static backward(delta){
    return nj.subtract(nj.ones(delta.shape),
    nj.power(nj.tan(delta), 2))
  }
}


class Relu{

  static forward(z){
    return nj.clip(z, 0, Number.POSITIVE_INFINITY)
  }

  static backward(delta){
    return delta
  }
}


class Softmax{
  static forward(z){
    let numerator = nj.exp(nj.subtract(z, z.max()))
    return nj.divide(numerator, nj.sum(numerator))
  }

  static backward(delta){
    let dot = nj.dot(delta.reshape(-1, 1), delta.reshape(1, -1))
    return nj.subtract( nj.diag(delta.flatten()), dot)
  }
}

class ActivationSelector{
  static get(name){
    let options = {'Relu': Relu, 'Tanh': Tanh, 'Sigmoid':Sigmoid}
    return options[name]
  }
}


module.exports = {
  Step,
  Sigmoid,
  Tanh,
  Relu,
  Softmax,
  ActivationSelector
}
