import {NeuralNetwork} from '../src/anns/neuralNetwork'
import {Normal, Uniform, Constant} from '../src/anns/initialization'
import {Sigmoid, Tanh, Relu} from '../src/anns/activationFunction'
import {SquareError} from '../src/anns/costfuncs'
import nj from 'numjs'

test('Constructing Layers Neural Network should be ok', ()=>{
    let architecture = [7, 10, 10, 2]
    let expected = [
      [7 ,10],
      [10, 10],
      [10, 2]
    ]
    let neuralNetwork = new NeuralNetwork(architecture, Normal)
    for (let i = 0; i < neuralNetwork.n_layers - 1; i++) {
       expect(neuralNetwork.W[i].shape).toEqual(expected[i])
    }
})

test('Constructing Drawing Layers of Neural Network should be ok', ()=>{
    let architecture = [7, 10, 9, 10, 2]
    let expected = 271
    let neuralNetwork = new NeuralNetwork(architecture, Normal)
    expect(neuralNetwork.generateDrawer().length).toEqual(expected)
})

test('Forward error of Neural Network should be ok', ()=>{
    let architecture = [3, 6, 5, 2]
    let data = nj.array([[0.03, 0.666, 0.3], [0.7, 0.3, 0.6],
      [0.7, 0.6, 0.8], [0.7, 0.3, 0.1]]
    )
    let expected = [[0.5717620219542309, 0.5717620219542309],
           [ 0.5720311822479661, 0.5720311822479661],
           [ 0.5722527141785307, 0.5722527141785307],
           [ 0.5718084691376255, 0.5718084691376255]]
    let neuralNetwork = new NeuralNetwork(architecture, Constant, Sigmoid, SquareError)
    expect(neuralNetwork.forward(data).tolist()).toEqual(expected)
})


test('Backward error of Neural Network should be ok', ()=>{
    let architecture = [3, 6, 5, 2]
    let data = nj.array([[0.03, 0.666, 0.3], [0.7, 0.3, 0.6],
      [0.7, 0.6, 0.8], [0.7, 0.3, 0.1]]
    )
    let expected = 0.11530943215349235

    let y = nj.array([[0, 1], [0, 1], [0, 1], [1, 0]])
    let neuralNetwork = new NeuralNetwork(architecture, Constant, Sigmoid, SquareError)
    expect(neuralNetwork.gradientDescend(data, y)).toEqual(expected)
})
