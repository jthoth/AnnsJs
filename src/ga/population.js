//
const {randomInt, max} = require('mathjs')

class Population{

  constructor(quantity, target, encoder, dna){
    this.encoder = encoder
    this.quantity = quantity
    this.target = target
    this.dna = dna
    this.individuals = this.loadIndividuals()
  }

  loadDNA(){
    let dna = new this.dna(this.encoder)
    dna.fitness(this.target)
    return dna
  }

  loadIndividuals(){
    let container = []
    for (let i = 0; i < this.quantity; i++)
      container.push(this.loadDNA())
    return container
  }

  getRandomOponents(){
    let first = this.individuals[randomInt(this.quantity)]
    let second = this.individuals[randomInt(this.quantity)]
    return [first, second]
  }

  tourment(){
    let [first, second] = this.getRandomOponents()
    if(first.score > second.score)
          return first
    return second
  }

  nutaralSelection(){
    let parentOne = this.tourment()
    let parentTwo = this.tourment()
    let childOne = new this.dna(this.encoder, true)
    let childTwo = new this.dna(this.encoder, true)
    return [parentOne, parentTwo, childOne, childTwo]
  }

  updateChildrens(childOne, childTwo, mutationRate){
    childOne.fitness(this.target)
    childTwo.fitness(this.target)
    childOne.mutate(mutationRate)
    childTwo.mutate(mutationRate)
  }

  update(mutationRate){
    let newIndividuals = []
    for (let i = 0; i < this.quantity/2; i++){
      let [parentOne, parentTwo, childOne, childTwo] = this.nutaralSelection()

      parentOne.crossOver(parentTwo, childOne, childTwo)
      this.updateChildrens(childOne, childTwo, mutationRate)
      newIndividuals.push(childOne); newIndividuals.push(childTwo)
    }
    this.individuals = newIndividuals
  }

  getSample(number){
    let indexSamples = randomInt([number], this.quantity)
    return indexSamples.map((i) => this.individuals[i].getString())
  }

  getMaxScore(){
    return max(this.individuals.map((x) => x.score))
  }

  getTheBest(){
    return this.individuals[this.individuals.map((x) => x.score).reduce(
      (iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0
    )]
  }
}


module.exports = {
  Population,
}
