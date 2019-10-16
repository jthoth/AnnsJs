const { randomInt, random } = require('mathjs')

class AscciEncoder {

  constructor(from, to){
    this.from = from
    this.to = to
  }

  generateAscci(){
    return randomInt(this.from, this.to + 1)
  }

  generate(){
    return String.fromCharCode(this.generateAscci())
  }

}

class Binary extends AscciEncoder{
  constructor(){
    super('0'.charCodeAt(), '1'.charCodeAt()) // 0-1
  }
}

class Alphabet extends AscciEncoder{
  constructor(){
    super('a'.charCodeAt(), 'z'.charCodeAt()) // a-z
  }

  generateWithSpace(chanceSpace=0.1){
    if(random() < chanceSpace)
      return ' '
    return this.generate()
  }

}

module.exports = {
  Binary,
  Alphabet
}
