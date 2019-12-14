const similarity = require( 'compute-cosine-similarity' )
const {Terminal} = require('./trees')

class AbstractSyntacticTree{

  constructor(nodes, terminals, cutproba=0.3, maxOperations=100,
    withRepetitions=true){

    this.withRepetitions = withRepetitions
    this.maxOperations = maxOperations
    this.terminals = terminals
    this.cutproba = cutproba
    this.nodes = nodes
  }

  getFromArray(array){
    return array[~~(Math.random() * array.length)]
  }

  get(allowedDeepth=10){
    const nodeCreator = (depth) => {
        if(depth > 0) {
          let nodeInstance = this.getFromArray(this.nodes)
          return new nodeInstance(...Array.from(Array(2),
          ()=> Math.random() < this.cutproba ?
            nodeCreator(0) :  nodeCreator(depth - 1)))}
        return new Terminal(this.getFromArray(this.terminals))
    }
    return nodeCreator(allowedDeepth)
  }

  sample(){
    return this.get()
  }

  getPenalization(genes){
    let [penalize, totalOperations] = genes.getPenalization()
    if(this.withRepetitions)
      penalize = 0
    if(totalOperations <= this.maxOperations)
      return penalize
    return penalize + ((totalOperations - this.maxOperations)/totalOperations)
  }

  fitness(target, genes){
    let penalize = this.getPenalization(genes)
    let reducedTree = genes.eval()
    let loss = ((reducedTree  + target)/target) - 1
    return loss > 1 || isNaN(reducedTree) ? 0 : loss - penalize
  }

  encode(target){
    return parseFloat(target)
  }

}

class AbstractSyntacticTreeRegresor extends AbstractSyntacticTree{
  constructor(nodes, terminals, cutproba=0.3, maxOperations=100,
              withRepetitions=true){
    super(nodes, terminals, cutproba, maxOperations, withRepetitions)
  }

  fitness(target, genes){
    let penalize = this.getPenalization(genes)
    let predicted = Array.from({length:200}, (_, i)=> i - 100).map(
      (value) => genes.eval({x : value})
    )
    return similarity(target, predicted) - penalize
  }

  encode(target){
    return Array.from({length:200}, (_, i)=> i - 100).map(
      (x) => eval(target)
    )
  }

}

class EncoderSelectorGP{
  static get(name){
    let options = {
      'findTheNumber': AbstractSyntacticTree,
      'Regressor': AbstractSyntacticTreeRegresor,
    }
    return options[name]
  }
}


module.exports = {
  AbstractSyntacticTree,
  AbstractSyntacticTreeRegresor,
  EncoderSelectorGP,
}
