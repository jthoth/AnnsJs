# Neural Network and Genetic Programming using JavaScript Es6 and Vue

ANN | DNA
:-------------------------:|:-------------------------:
![](https://static.thenounproject.com/png/1503825-200.png) | ![](https://s3.us-east-2.amazonaws.com/upload-icon/uploads/icons/png/17374198251560147100-128.png)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This project is a homework, it is part of CC5114 (GENETIC PROGRAMMING AND NEURAL NETS).

### Tech

* [Os Windows]- Windows 10.
* [Node]- JavaScript run-time environment that executes JavaScript code outside of a browser
* [Language]- JavaScript Es6
* [Web Framework]- Vuejs
* [Graphs]- Google-graphs
* [Jest Test] - Testing and Mocking Framework

### Installation
homework installation steps you should install nodejs
'''sh
$ git clone https://github.com/jthoth/AnnsJs.git
$ cd AnnsJs
$ npm install
$ npm run test
$ npm run serve
'''

# Description About Neural Network Implementation

This homework is geared for learning or remembering those features about neural Networks. The main idea is build a class which allow us to use basic operations of training an artificial neural network.

**Note**: The code contains two main parts: Neural Networks classes in the folder **/src/anns** and all about data loading is in **/src/data**.

### Observations & Conclusions
- The neural network only needs 2 to 3 iterations to learn the datasets when the weights are initialized with a normal heuristic distribution and RELU activation function.
- Vectorized implementation allows the network to converge faster
- The graph of the weights allows seeing when the network is over-adjusted, in addition you can clearly see the exploding or fading of the weights.
- The z-score standardization works best for all 3 datasets as it allows weights to converge faster.
- In conclusion the architecture is robust and dynamic.

### ScreenShots
![N|Solid](https://raw.githubusercontent.com/jthoth/AnnsJs/master/public/images/end.png)

---

# Description About Genetic Algorithms Knapsack Approach

We try to solve the 0-1 Knapsack Problem (KP) using genetic algorithms, this is an optimization problem in which we used a combinatorial approach, this approach tries seeking to maximize the benefit of objects in a knapsack without exceeding its capacity. It was used a simple fitness **(adding the weights which was choosing then we constrain to the max capacity, being the fitness score the profit)** function due to the fact an implementation with penalties carries to odd results and the computational cost is expensive.

### About the code
The implementation of the core algorithm only depend on of the encoder, I mean the encoder process the input as string and gives to the GA the rules to maximize the score. In addition, we build an interactive tool.

**Note**: The code contains two main parts: Genetic Algorithms classes in the folder **/src/ga** and all about using evolution in **/src/components/GeneticAlgorithm.vue**. In the folder GA there are the encoders this is applied for each problem.

### About Charts Analysis
- We found that a big mutation rate don't allow the algorithm convergence.
- The population number has a big impact also the algorithm can find a solution with zero mutation rate.
- The evolution of fitness function for easy problems is stable compared with hard problems
- Commonly for this work there are a good trade-offs between Population and mutation rate, I always mean for each problem for any population number > 64 the best mutation rate was 0.05.

### Screenshots

![N|Solid](https://raw.githubusercontent.com/jthoth/AnnsJs/master/public/images/ga.png)

License
----

MIT
