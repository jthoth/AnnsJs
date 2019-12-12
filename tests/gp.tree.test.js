import {Subtraction,
        Multiplication,
        Max,
        Division,
        Addition} from '../src/gp/trees'

import {AbstractSyntacticTree} from  '../src/gp/encoders'

test('Addition Operator AST should be Ok', ()=>{
  let functors = [Addition]
  let terminals = [1]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(1)
  expect(2).toEqual(tree.eval())
})


test('Subtraction Operator AST should be Ok', ()=>{
  let functors = [Subtraction]
  let terminals = [1]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(1)
  expect(0).toEqual(tree.eval())
})

test('Multiplication Operator AST should be Ok', ()=>{
  let functors = [Multiplication]
  let terminals = [1]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(1)
  expect(1).toEqual(tree.eval())
})

test('Max Operator AST should be Ok', ()=>{
  let functors = [Max]
  let terminals = [1, 5, 5, 5, 5, 5]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(3)
  expect(5).toEqual(tree.eval())
})

test('Division Break AST should be Ok', ()=>{
  let functors = [Division]
  let terminals = [0, 0, 0]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(5)
  expect(0/0).toEqual(tree.eval())
})

test('Division Right AST should be Ok', ()=>{
  let functors = [Division]
  let terminals = [2]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(1)
  expect(1).toEqual(tree.eval())
})

test('Searialize Node Test should be Ok', ()=>{
  let functors = [Division, Multiplication, Max]
  let terminals = [2, 3, 5, 2]
  let ast  = new AbstractSyntacticTree(functors, terminals)
  let tree = ast.get(1)
  expect(1).toEqual(tree.serialize().length)
})
