const _ = require('lodash');

class Node{

  constructor(functor){
    this.functor = functor
    this.args = Array()
  }

  eval(variable={}){
    return this.functor(
    ...this.args.map((node) => node.eval(variable)))
  }

  copy(){
    return _.cloneDeep(this)
  }

  numOperations(){
     let [current, totalOperations] = [[this], 0]
     while (current.length > 0){
       let level = []
       for(let node of current){
           if(node.functor.length){
               totalOperations++
               level.push(...node.args)
           }
       }
       current = level
     }
    return totalOperations
  }

  getPenalization(){
     let [allNodes, cache] = [this.serialize(), {}]
     for(let item of allNodes){
       if(item.args.map((arg)=>arg.functor.length).reduce(
         (x, y) => x + y, 0) == 0){
           let reduced = item.functor(
             ...item.args.map((arg)=>arg.value)
           )
           if(cache[reduced] == true)
             return [1, allNodes.length]
           cache[reduced] = true
       }
     }
     return [0, allNodes.length]
   }

  replace(nodeInstance){
    this.functor = Object.assign(nodeInstance.functor)
    this.value = Object.assign(nodeInstance.value)
    this.args = _.cloneDeep(nodeInstance.args)
  }

  serialize(){
    let [current, allnodes] = [[this], []]
     while (current.length > 0){
       let level = []
       for(let node of current){
           if(node.functor.length){
               allnodes.push(node)
               level.push(...node.args)
           }
       }
       current = level
     }
     return allnodes
  }

  flattenTree(previous=''){
    if(this.args.length){
      let container = []
      for (let i = 0; i < this.args.length; i++)
        container.push(
          ...this.args[i].flattenTree(previous + this.value + ' ')
          )
      return container
    }
    else{
      return [previous + this.value]
    }
  }

  toList(){
    let result = this.flattenTree().map((item)=>[item])
    return [['AbstractSyntacticTree']].concat(result)
  }
}

class BinaryOperator extends Node{

  constructor(functor, left, right){
    super(functor)
    this.args.push(left)
    this.args.push(right)
  }

}

class Addition extends BinaryOperator{

  constructor(left, right){
    super((x, y) => x + y, left, right)
    this.value = '(+)'
  }
}

class Subtraction extends BinaryOperator{

  constructor(left, right){
    super((x, y) => x - y, left, right)
    this.value = '(-)'
  }
}

class Multiplication extends BinaryOperator{

  constructor(left, right){
    super((x, y) => x * y, left, right)
    this.value = '(*)'
  }
}

class Division extends BinaryOperator{

  constructor(left, right){
    super((x, y) => x / y, left, right)
    this.value = '(/)'
  }
}

class Max extends BinaryOperator{

  constructor(left, right){
    super(Math.max, left, right)
    this.value = '(max)'
  }
}

class Terminal extends Node{

  constructor(value){
    super(()=> value)
    this.value = value
  }

  eval(variable={}){
    if(isNaN(this.value)){
        return variable[this.value] || 0
    }
    return this.value
  }
}


class OperatorSelector{
  static get(name){
    let options = {
      'add': Addition,
      'sub': Subtraction,
      'mul': Multiplication,
      'max': Max,
      'div': Division,
    }
    return options[name]
  }
}


module.exports = {
  Addition,
  Subtraction,
  Multiplication,
  Max,
  Division,
  Terminal,
  OperatorSelector
}
