import {Uniform, Normal} from '../src/anns/initialization'

test('Generate Uniform random matrix', ()=>{
  let shape = [3, 5]
  let uniform = new Uniform(shape)
  let W = uniform.generate()
  expect(W.shape).toEqual(shape);
})


test('Generate Normal random matrix', ()=>{
  let shape = [3, 5]
  let normal = new Normal(shape)
  let W = normal.generate()
  expect(W.shape).toEqual(shape);
})
