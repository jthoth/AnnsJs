import {Binary, Alphabet, WeighAlphabet} from '../src/ga/encoders'


test('Testing Binary generator code should be ok', ()=>{

  let bin = new Binary(10)
  expect(bin.get().length).toEqual(10)

});

test('Testing Alphabet generator code should be ok', ()=>{
  let alph = new  Alphabet(25)
  expect(alph.get().length).toEqual(25)
});

test('Testing Weight Alphabet generator code should be ok', ()=>{
  let alph = new  WeighAlphabet(20)
  expect(alph.get().length).toEqual(20)
});
