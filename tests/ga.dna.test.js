import {DeoxyribonucleicAcid} from '../src/ga/dna'
import {Binary, Alphabet, WeighAlphabet} from '../src/ga/encoders'


test('Testing DNA Constructor generator using Binary encoder should be ok', ()=>{
  let dna = new DeoxyribonucleicAcid(new Binary(10))
  expect(dna.genes.length).toEqual(10)

});

test('Testing DNA Constructor generator using Alphabet encoder should be ok', ()=>{
  let dna = new DeoxyribonucleicAcid(new Alphabet(10))
  expect(dna.genes.length).toEqual(10)

});

test('Testing best fitness DNA sample should be ok', ()=>{
  let expected = [98, 97, 96 ,95, 94]
  let dna = new DeoxyribonucleicAcid(new Alphabet(expected.length), true)
  dna.genes = expected
  expect(dna.fitness(expected)).toEqual(1)
});

test('Testing worst fitness DNA sample should be ok', ()=>{
  let expected = [98, 97, 96 ,95, 94]
  let dna = new DeoxyribonucleicAcid(new Alphabet(expected.length), true)
  dna.genes = [0, 1, 2, 3, 4]
  expect(dna.fitness(expected)).toEqual(0)
});
