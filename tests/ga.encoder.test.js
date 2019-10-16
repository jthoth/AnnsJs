import {Binary, Alphabet} from '../src/ga/encoders'


test('Testing Binary generator code should be ok', ()=>{

  let bin = new Binary()
  expect(bin.generateAscci()).toBeGreaterThanOrEqual(48)
  expect(bin.generateAscci()).toBeLessThanOrEqual(49)

});

test('Testing Alphabet generator code should be ok', ()=>{
  let alph = new  Alphabet()
  expect(alph.generateAscci()).toBeGreaterThanOrEqual(97)
  expect(alph.generateAscci()).toBeLessThanOrEqual(122)
});
