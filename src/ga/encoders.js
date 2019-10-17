const {randomInt, pickRandom} = require('mathjs')

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
    return [32, 33, 44, 45, 46]
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
    let samples =  pickRandom(this.alphabet, this.numSamples, this.weights)
    return empty ? Array(this.numSamples) : samples
  }

  sample(){
    return pickRandom(this.alphabet, 1, this.weights)
  }

  buildVocabulary(){
    let vocabulary = Alphabet.lower().concat(Alphabet.commonSynbols())
    let symbolsWeights = [300, 200, 150, 100, 50]
    let weights = this.englishFrecuencyChars().concat(symbolsWeights)
    return [vocabulary, weights]
  }
}

module.exports = {
  Binary,
  Alphabet,
  WeighAlphabet
}
