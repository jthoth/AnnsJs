import {Data, MaxMinNormalizer, ZscoreNormalizer} from '../src/data/loader'
const nj = require('numjs')

test('Building Dataset Max Min data should be ok', ()=>{
  let row = '1,7,6,1\n9,8,7,1\n170,5,2,2\n0,8,7,1\n10,5,2,2\n10,5,0,1\n1000,50,2,2'
  let data = new Data(row, MaxMinNormalizer)
  let [X_train, X_test, y_train, y_Test] = data.get(0.8)
  expect(X_train.shape).toEqual([5, 3])
  expect(X_test.shape).toEqual([2, 3])
  expect(y_train.shape).toEqual([5, 2])
  expect(y_Test.shape).toEqual([2, 2])
})

test('Normalize Max Min data should be ok', ()=>{
    let data = new Data('5,7,8\n9,8,7\n10,5,2')
    let expected = [[ 0,0.6666666666666666, 1],
               [0.8,1,0.8333333333333334],
               [ 1, 0, 0]]
    let input = nj.array(data.getParsedData())
    expect(MaxMinNormalizer.apply(input).tolist()).toEqual(expected)
})

test('Zcore data normalization should be ok', ()=>{
    let data = new Data('5,7,8\n9,8,7\n10,5,2')
    let expected = [[-1.3887301496588265, 0.2672612419124246, 0.8890008890013336],
           [0.4629100498862755, 1.0690449676496994, 0.508000508000762],
           [ 0.925820099772551, -1.3363062095621245, -1.397001397002096]]
    let input = nj.array(data.getParsedData())
    expect(ZscoreNormalizer.apply(input).tolist()).toEqual(expected)
})
