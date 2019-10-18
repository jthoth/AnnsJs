const {random, randomInt} = require('mathjs')


class DeoxyribonucleicAcid {

  constructor(encoder, empty=false){
    this.genes = encoder.get(empty)
    this.encoder = encoder
  }

  getString(){
    return this.encoder.decode(this.genes)
  }

  fitness(target){
    this.score = this.encoder.fitness(target, this.genes)
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
    this.genes = this.genes.map((v)=>{
      return random() <= rate ? this.encoder.sample() : v
    })
  }
}

module.exports = {
  DeoxyribonucleicAcid,
}
