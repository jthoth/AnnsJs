import {DeoxyribonucleicAcid} from '../src/ga/dna'
import {Binary, Alphabet} from '../src/ga/encoders'


test('Testing DNA Constructor generator using Binary encoder should be ok', ()=>{
  let encoder = new Binary()
  let dna = new DeoxyribonucleicAcid(10, encoder)
  expect(dna.genes.length).toEqual(10)
  
});

test('Testing DNA Constructor generator using Alphabet encoder should be ok', ()=>{
  let encoder = new Alphabet()
  let dna = new DeoxyribonucleicAcid(30, encoder)
  expect(dna.genes.length).toEqual(30)

});
