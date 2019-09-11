# Neural Network Using Javascript Es6 and Vue

![N|Solid](https://static.thenounproject.com/png/1503825-200.png)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This project is a homework, it is part of CC5114 (GENETIC PROGRAMMING AND NEURAL NETS).
# Description

This homework is geared for  learning  or remembering those features about neural Networks. The main idea is build a class which allow us to use basic operations of training an artificial neural network.

**Note**: The code contains two main parts: Nueral Networks classes in the folder **/src/anns** and all about data loading is in **/src/data**.

### Tech

* [Os Windows]- Windows 10.
* [Node]- JavaScript run-time environment that executes JavaScript code outside of a browser
* [Languaje]- Javascript Es6
* [Web Framwork]- Vuejs
* [Graphs]- Google-graphs
* [Jest Test] - Testing and Mocking Framework

### Installation
homework installation steps youd should install nodejs
```sh
$ git clone https://github.com/jthoth/AnnsJs.git
$ cd AnnsJs
$ npm install
$ npm run test
$ npm run serve
```
### Homework Observations & Conclusions
- The neural network only needs 2 to 3 iterations to learn the datasets when the weights are initialized with a normal heuristic distribution and relu activation function.
- Vectorized implementation allows the network to converge faster
- The graph of the weights allows to see when the network is over-adjusted, in addition you can clearly see the exploration or fading of the weights.
- The z-score standardization works best for all 3 datasets as it allows weights to converge faster.
- In conclusion the architecture is robust and dynamic.

### ScreenShots
![N|Solid](https://raw.githubusercontent.com/jthoth/AnnsJs/master/public/images/init.png)

![N|Solid](https://raw.githubusercontent.com/jthoth/AnnsJs/master/public/images/end.png)


License
----

MIT
