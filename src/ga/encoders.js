const {randomInt, pickRandom, mean, sum} = require('mathjs')

class Generator{

  constructor(numSamples, options){
    this.numSamples = numSamples
    this.from = options[0]
    this.to = options.slice(-1)[0]
  }

  get(empty=false){
    let samples = randomInt([this.numSamples], this.from, this.to + 1)
    return empty ? Array(this.numSamples) : samples
  }

  sample(){
    return randomInt(this.from, this.to + 1)
  }

  static encodeTarget(target){
    return Array.from(Array(target.length), (_, i)=> target[i].charCodeAt())
  }

  fitness(target, genes){
    return mean(genes.map((v, i)=>{
      return target[i] == v
    }))
  }

  decode(genes){
     return String.fromCharCode(...genes)
  }

}

class Binary extends Generator{
  constructor(numSamples){
    super(numSamples, ['0'.charCodeAt(0), '1'.charCodeAt(0)])
  }
}

class Alphabet extends Generator{
  constructor(numSamples){
    super(numSamples, Alphabet.lower())
  }

  static lower(){
    return Array.from(Array(26), (_, x) => x + 97)
  }

  static upper(){
    return Array.from(Array(26), (_, x) => x + 65)
  }

  static commonSynbols(){
    return [32, 33, 44, 45, 46, 39]
  }

}

class WeighAlphabet{

  constructor(numSamples){
    let [alphabet, weights] = this.buildVocabulary()
    this.numSamples = numSamples
    this.alphabet = alphabet
    this.weights = weights
  }

  englishFrecuencyChars(){
    // a - z order weights
    return [14810, 2715, 4943, 7874, 21912, 4200, 3693, 10795,
            13318, 188, 1257, 7253, 4761, 12666, 14003, 3316,
            205, 10977, 11450, 16587, 5246, 2019, 3819, 315,
            3853, 128]
  }

  get(empty=false){
    let samples =  Array.from(Array(this.numSamples), ()=>this.sample())
    return empty ? Array(this.numSamples) : samples
  }

  sample(){
    return pickRandom(this.alphabet, 1, this.weights)[0]
  }

  buildVocabulary(){
    let vocabulary = Alphabet.lower().concat(
      Alphabet.commonSynbols()
    ).concat(Alphabet.upper())
    let symbolsWeights = [1000, 200, 150, 100, 50, 100]
    let weights = this.englishFrecuencyChars().concat(
      symbolsWeights
    ).concat(this.englishFrecuencyChars())
    return [vocabulary, weights]
  }

  static encodeTarget(target){
    return Array.from(Array(target.length), (_, i)=> target[i].charCodeAt())
  }

  fitness(target, genes){
    return mean(genes.map((v, i)=>{
      return target[i] == v
    }))
  }

  decode(genes){
     return String.fromCharCode(...genes)
  }
}

class Knapsack{

  constructor(numSamples){
    this.numSamples = numSamples
  }

  static encodeTarget(target){
    let splited = target.replace(/\s/g, '').split(',').map(parseFloat)
    let [bagOfItems, capacity] = [[], splited.slice(-1)[0]]
    for (var i = 0; i <= Math.floor(splited.length/2); i++) {
      bagOfItems.push([splited[i], splited[i + 1], capacity])
    }
    return bagOfItems
  }

  fitness(target, genes){
    let maxCapacity = target[0][2]
    let w = sum(target.map((v, i) => v[0] * genes[i]))
    let v = sum(target.map((v, i) => v[1] * genes[i]))
    return w < maxCapacity ? v/100 : 0
  }

  get(empty=false){
    let samples = randomInt([this.numSamples], 0, 2)
    return empty ? Array(this.numSamples) : samples
  }

  decode(genes){
     return `(${genes.join(', ')})`
  }

  sample(){
    return randomInt(0, 2)
  }

}

class EncoderSelector{
  static get(name){
    let options = {
      'binary': Binary,
      'alphabet': Alphabet,
      'walphabet': WeighAlphabet,
      'knapsack':Knapsack
    }
    return options[name]
  }
}

module.exports = {
  Binary,
  Alphabet,
  WeighAlphabet,
  Knapsack,
  EncoderSelector
}
