const {random, randomInt, mean} = require('mathjs')

const compose = (...funcs) => args => funcs.reduceRight(
    (arg, fn) => fn(arg), args
)  // Function Compossition

class DeoxyribonucleicAcid {

  constructor(encoder, empty=false){
    this.genes = encoder.get(empty)
    this.encoder = encoder
  }

  getString(){
    return String.fromCharCode(...this.genes)
  }

  fitness(target){
    this.score = mean(this.genes.map((v, i)=>{
        return target[i] == v
    }))
    return this.score
  }

  crossOver(couple, childOne, childTwo){
    let partition = randomInt(this.genes.length)
    childOne.genes = this.genes.map((v, i)=>{
      return i <= partition ? v : couple.genes[i]
    })
    childTwo.genes = this.genes.map((v, i)=>{
      return i > partition ? v : couple.genes[i]
    })
  }

  mutate(rate){
    this.genes = this.genes.map((v, i)=>{
      return random() <= rate ? this.encoder.sample() : v
    })
  }
}

module.exports = {
  DeoxyribonucleicAcid,
}
