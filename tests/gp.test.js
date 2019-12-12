import {Subtraction,
        Multiplication,
        Max,
        Addition} from '../src/gp/trees'

import {Population} from '../src/ga/population'
import {AbstractSyntacticTree} from  '../src/gp/encoders'
import {DeoxyribonucleicAcidGP} from '../src/gp/dna'



test('Population Test Operator over AST should be Ok', ()=>{
  let functors = [Addition, Subtraction, Multiplication, Max]
  let terminals = [25, 7, 8, 100, 4, 2]

  let encoder  = new AbstractSyntacticTree(functors, terminals)
  let target = 65346
  let population = new Population(5, target, encoder, DeoxyribonucleicAcidGP)
  expect(5).toEqual(population.individuals.length)
})
