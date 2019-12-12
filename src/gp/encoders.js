const {Terminal} = require('./trees')


class AbstractSyntacticTree{

  constructor(nodes, terminals, cutproba=0.3){
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

  fitness(target, genes){
    let loss = ((genes.eval()  + target)/target) - 1
    return loss > 1 ? 0 : loss

  }

  encode(target){
    return parseFloat(target)
  }

}


class EncoderSelectorGP{
  static get(name){
    let options = {
      'findTheNumber': AbstractSyntacticTree,
    }
    return options[name]
  }
}


module.exports = {
  AbstractSyntacticTree,
  EncoderSelectorGP,
}
