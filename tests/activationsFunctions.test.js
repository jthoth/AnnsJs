import {Step, Sigmoid, Tanh, Relu, Softmax} from '../src/anns/activationFunction'
import nj from 'numjs'


test('Test vector Step forward should be ok', ()=>{
    const z = nj.array([1, 2, -3])
    const expected = [1, 1, 0]
    expect(Step.forward(z).tolist()).toEqual(expected)
})

test('Test vector Step backward should be ok', ()=>{
    const delta = nj.array([1, 2, 7])
    const expected = [0, 0, 0]
    expect(Step.backward(delta).tolist()).toEqual(expected)
})

test('Test vector Sigmoid forward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [0.04742587317756678, 0.3775406687981454,
      0.5,0.6224593312018546,0.9525741268224334]
    expect(Sigmoid.forward(z).tolist()).toEqual(expected)
})

test('Test vector Sigmoid backward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [0.04517665973091214,0.2350037122015945, 0.25
      , 0.2350037122015945, 0.045176659730912]
    expect(Sigmoid.backward(z).tolist()).toEqual(expected)
})


test('Test vector Tanh forward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [-0.9950547536867306, -0.4621171572600098,
      0, 0.4621171572600098, 0.9950547536867306]
    expect(Tanh.forward(z).tolist()).toEqual(expected)
})

test('Test vector Tanh backward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [0.979680483057573, 0.7015535895904752,
      1, 0.7015535895904752, 0.979680483057573]
    expect(Tanh.backward(z).tolist()).toEqual(expected)
})

test('Test vector Relu forward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [0, 0, 0, 0.5, 3]
    expect(Relu.forward(z).tolist()).toEqual(expected)
})

test('Test vector Relu backward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [-3, -0.5, 0, 0.5, 3]
    expect(Relu.backward(z).tolist()).toEqual(expected)
})

test('Test vector Softmax forward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [0.0021285097269069042,0.02593055689334196,
      0.04275226071115273,0.07048656160499489, 0.8587021110636035]
    expect(Softmax.forward(z).tolist()).toEqual(expected)
})

test('Test vector Softmax backward should be ok', ()=>{
    const z = nj.array([-3, -0.5, 0, 0.5, 3])
    const expected = [[-12.  ,  -1.5 ,   0.  ,   1.5 ,   9.  ],
       [ -1.5 ,  -0.75,   0.  ,   0.25,   1.5 ],
       [  0.  ,   0.  ,   0.  ,   0.  ,   0.  ],
       [  1.5 ,   0.25,   0.  ,   0.25,  -1.5 ],
       [  9.  ,   1.5 ,   0.  ,  -1.5 ,  -6.  ]]
    expect(Softmax.backward(z).tolist()).toEqual(expected)
})
