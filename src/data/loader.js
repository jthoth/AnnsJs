const nj = require('numjs')


class MaxMinNormalizer{

  static apply(X){
    let container = []
    X.iteraxis(1, (column)=>{
      let numerator = nj.subtract(column, column.min())
      container.push(nj.divide(numerator, column.max() - column.min()))
    })
    return nj.stack(container).transpose()
  }
}

class ZscoreNormalizer{

  static apply(X){
    let container = []
    X.iteraxis(1, (column)=>{
      let numerator = nj.subtract(column, column.mean())
      container.push(nj.divide(numerator, column.std()))
    })
    return nj.stack(container).transpose()
  }
}

class Data{

  constructor(dataString, normMethod){
    this.dataString = dataString
    this.normMethod = normMethod
  }

  getParsedData(){
    let dataset = this.dataString.split('\n')
    .map((row)=>row.split(',').map(parseFloat))
    return dataset;
  }

  toCategorical(labels){
    let container = nj.zeros([labels.shape[0], labels.max()])
    for (var i = 0; i < labels.shape[0]; i++){
        container.set(i, labels.get(i) - 1, 1)
    }
    return container
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return nj.array(array)
  }

  build(dataset){
    let X = dataset.slice(null, [null, -1])
    X = this.normMethod.apply(X)
    let labels = dataset.slice(null, X.shape[1]).flatten()
    let y = this.toCategorical(labels)
    return [X, y]
  }

  get(trainSize=0.8){
    let [X, y] = this.build(this.shuffle(this.getParsedData()))
    let trainUpper = Math.floor(X.shape[0] * trainSize)
    return [
      X.slice([null, trainUpper], null),   X.slice(trainUpper, null),
      y.slice([null, trainUpper], null),  y.slice(trainUpper, null),]
  }

}

class NormSelector{
  static get(name){
    let options = {'maxMinNorm':MaxMinNormalizer,
    'zScoreNorm':ZscoreNormalizer};
    return options[name]
  }
}


module.exports = {
  Data,
  ZscoreNormalizer,
  MaxMinNormalizer,
  NormSelector
}
