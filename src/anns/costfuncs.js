const nj = require('numjs')


class SquareError {

  static forward(a, y){
    return nj.multiply(nj.power(nj.subtract(a, y), 2), 0.5)
  }

  static backward(a, y){
    return nj.subtract(a, y)
  }
}

class CostSelector{
  static get(name){
    let options = {'SquareError':SquareError}
    return options[name]
  }
}

module.exports = {
  CostSelector,
  SquareError
}
