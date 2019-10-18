<template >
  <v-container fluid grid-list-xl>

    <v-row>
      <v-col md="3">
        <v-card class="pa-2" raised tile>
          <div class="overline mb-4"> <v-icon>mdi-controller-classic</v-icon> Controls</div>
          <v-col cols="12">
            <v-select v-model="experiment" label="Experiment" item-text="name" item-value="value"
              :items="experiments"
              v-on:change="loadExperiment"
              outlined>
            </v-select>
            <label class="overline">Max Generations ({{NumGenerations}})</label>
            <v-slider v-model="NumGenerations" :max="1000" :min="0" :step="1" ></v-slider>
            <label class="overline">Actual Generation ({{ActualGeneration}})</label>
            <v-slider v-model="ActualGeneration" :max="1000" :min="0" :step="1"></v-slider>
            <label class="overline">Pupulation Quantity ({{NumPopulation}})</label>
            <v-slider v-model="NumPopulation" :max="5000" :min="0" :step="1" v-on:change="resetValues"></v-slider>
            <label class="overline">Mutation Rate ({{mutationRate}})</label>
            <v-slider v-model="mutationRate" :max="1" :min="0" :step="0.01"></v-slider>
            <v-btn class="mr-2 mt-2" outlined color="indigo" block  @click="updatePopulation"> Step</v-btn>
            <v-btn class="mr-2 mt-2" outlined color="indigo" block @click="runAlgorithm"> Run All</v-btn>
            <v-btn class="mr-2 mt-2" outlined color="indigo" block @click="resetValues"> Reset</v-btn>
          </v-col>
        </v-card>
      </v-col>
      <v-col md="9">
        <v-card class="pa-2" raised tile>
            <v-row>
                <v-col md="4">
                  <div class="overline ml-2"> <v-icon>mdi-video-input-component</v-icon> Input</div>
                  <v-col cols="12">
                    <v-text-field
                      v-model="target"
                      v-on:keyup="loadExperiment"
                      label="Write your target"
                      required
                    ></v-text-field>
                    <div class="overline" v-if="experiment == 'knapsack'">
                       format: v1, w1, v2, w2, ...., vm, wm, BagCapacity
                    </div>
                    <div class="overline" v-if="experiment == 'knapsack' && render">
                       weights: {{1}}
                    </div>
                    <div class="overline" v-if="experiment == 'knapsack' && render">
                       soluation: {{weights}} &lt; {{maxCapacity}} winning: {{profit}}
                    </div>
                    <v-btn class="mr-2 mt-2" outlined color="indigo" block @click="generateKnapsap"
                     v-if="experiment == 'knapsack'"
                    > Generate Random </v-btn>

                  </v-col>
                </v-col>
                <v-col md="4">
                  <div class="overline ml-2"> <v-icon>mdi-dna</v-icon> Best DeoxyribonucleicAcid Fitness</div>
                  <v-col cols="12">
                    <v-list-item two-line>
                      <v-list-item-content v-if="render">
                        <v-list-item-title>{{bestDna.getString()}}</v-list-item-title>
                        <v-list-item-subtitle class="mt-2"><b>fitness: </b> {{bestDna.score | percentage}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-col>
                <v-col md="4">
                  <div class="overline ml-2"> <v-icon>mdi-account-switch</v-icon> SAMPLE POPULATION</div>
                  <v-col cols="12">
                    <v-list-item>
                      <v-list-item-content v-if="render">
                        <v-list-item-title v-for="(value, index) in populationSample" :key='index'>
                          {{value}}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6">
                  <div class="overline ml-2"> <v-icon>mdi-chart-line</v-icon> Graphs Evolution</div>
                  <v-col cols="12" v-if="render">
                      <apexchart width="100%" height="300" type="line"  :options="chartOptions"  :series="series"></apexchart>
                  </v-col>
                </v-col>
                <v-col md="6">
                  <div class="overline ml-2"> <v-icon>mdi-chart-tree</v-icon> HeatMap GridSearch After <b>100</b> Generations</div>
                  <v-col cols="12" v-if="render">
                      <apexchart width="100%" height="300" type="heatmap"  :options="chartOptionsHM"  :series="seriesHM"></apexchart>
                      <v-btn class="mr-2 mt-2" outlined color="indigo" block @click="heatMapGenerator"> Compute HeatMap </v-btn>
                      <div class="text-xs-center">
                        <v-progress-linear :indeterminate='ComputingHeatmap' ></v-progress-linear>
                      </div>
                  </v-col>
                </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {EncoderSelector} from '../ga/encoders'
import {Population} from '../ga/population'
import {randomInt, sum} from 'mathjs'

export default{
  data: () => ({
    target:'',
    chartOptions:{yaxis:{labels:{
        formatter: (value) => `${Math.round(value * 100, 2)} %`
    }}},
    chartOptionsHM:{colors: ["#1976d2"]},
    seriesHM:[],
    ComputingHeatmap:false,
    render:false,
    targetEncoded:[],
    mutationRate:0.01,
    NumGenerations:100,
    ActualGeneration:0,
    NumPopulation:1000,
    instanceOfEncoder:'',
    instanceOfPopulation:'',
    bestDna:'',
    populationSample:'',
    profit:0,
    weights:0,
    maxCapacity:0,
    series:[{name:'Fitness Evolution', data:[]}],
    experiments : [
      {name:'Binary', value:'binary'},
      {name:'LowerCase a-z', value:'alphabet'},
      {name:'Enlglish Common Vocab', value:'walphabet'},
      {name:'Knapsack 0-1 Problem', value:'knapsack'},
    ],
    experiment:'knapsack'
  }),
  methods:{
    resetValues: function(){
      this.render = false
      this.series[0]['data'] = []
      this.seriesHM = []
      this.ActualGeneration=0
      this.target = ''
    },
    loadExperiment: function() {
      let lowerBound = this.experiment == 'knapsack' ? 10 : 2
      if(this.target.length > lowerBound){
        let encoder = EncoderSelector.get(this.experiment)
        this.targetEncoded = encoder.encodeTarget(this.target)
        this.instanceOfEncoder = new encoder(this.targetEncoded.length)
        this.instanceOfPopulation = new Population(
          this.NumPopulation, this.targetEncoded, this.instanceOfEncoder
        )
        this.bestDna = this.instanceOfPopulation.getTheBest()
        this.populationSample = this.instanceOfPopulation.getSample(10)
        this.render = true
      }

      if(this.experiment == 'knapsack')
        this.updateBestFitter()

    },
    updatePopulation: function() {
      let lowerBound = this.experiment == 'knapsack' ? 10 : 2
      if(this.target.length > lowerBound ){
        this.instanceOfPopulation.update(this.mutationRate)
        this.bestDna = this.instanceOfPopulation.getTheBest()
        this.series[0]['data'].push(this.bestDna.score)
        this.populationSample = this.instanceOfPopulation.getSample(10)
        this.ActualGeneration += 1
        this.render = true
      }

      if(this.experiment == 'knapsack')
        this.updateBestFitter()
    },
    runAlgorithm: function() {
      let lowerBound = this.experiment == 'knapsack' ? 10 : 2
      if(this.target.length > lowerBound){
        for (var i = 0; i < this.NumGenerations; i++) {
          if(this.bestDna.score == 1)
            break
          this.updatePopulation()
        }
      }
    },
    heatMapGenerator: function(){
      let population = Array.from(Array(5), (_, i) => Math.pow(2, i + 6))
      let mutationRates = [0.0, 0.01, 0.05, 0.1, 0.25, 0.5, 1]

      for (var i = 0; i < population.length; i++) {
        let data = []

        let instanceOfPopulation = new Population(
          population[i], this.targetEncoded, this.instanceOfEncoder
        )

        for (var j = 0; j < mutationRates.length; j++) {

            for (var k = 0; k < 100; k++) {
              instanceOfPopulation.update(mutationRates[j])
            }

            data.push({
              x:`Mut(${mutationRates[j]})`,
              y:Math.round(instanceOfPopulation.getTheBest().score * 100, 2)/100
            })
        }
          this.seriesHM.push(
            {name:`Population(${population[i]})`, data:data}
          )
      }
    },
    generateKnapsap:function(){
      let samples = randomInt(5, 20) * 2 - 1
      this.target = randomInt([samples], 1, 70).join(', ')
      this.loadExperiment()
    },
    updateBestFitter:function(){
      this.weights = sum(this.targetEncoded.map(
        (v, i) => v[0] * this.bestDna.genes[i])
      )
      this.profit = sum(this.targetEncoded.map(
        (v, i) => v[1] * this.bestDna.genes[i])
      )
      this.maxCapacity = this.targetEncoded[0][2]
    }
  },
  filters: {
    percentage: function (value) {
      return `${Math.round(value * 100, 2)} %`
    }
  }
}
</script>
