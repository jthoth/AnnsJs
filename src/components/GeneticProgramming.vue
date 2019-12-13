<template >
  <v-container fluid grid-list-xl>

    <v-row>
      <v-col md="3">
        <v-card class="pa-2" raised tile>
          <div class="overline mb-4"> <v-icon>mdi-controller-classic</v-icon> Controls</div>
          <v-col cols="12">
            <v-select v-model="experiment" label="Experiment" item-text="name" item-value="value"
            :items="experiments"
             @change="loadExperiment"
            outlined>
          </v-select>
          <label class="overline">Max Generations ({{NumGenerations}})</label>
          <v-slider v-model="NumGenerations" :max="1000" :min="0" :step="1" ></v-slider>
          <label class="overline">Actual Generation ({{ActualGeneration}})</label>
          <v-slider v-model="ActualGeneration" :max="1000" :min="0" :step="1"></v-slider>
          <label class="overline">Pupulation Quantity ({{NumPopulation}})</label>
          <v-slider v-model="NumPopulation" :max="1000" :min="0" :step="1" v-on:change="resetValues"></v-slider>
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
              v-model="targetgp"
              label="Write your target"
              v-on:keyup="loadExperiment"
              required
              ></v-text-field>

              <v-text-field
              v-model="terminals"
              v-on:keyup="loadExperiment"
              label="Write your terminals nodes e.g 7, 5, 3"
              required
              ></v-text-field>


              <v-select
              v-model="operation"
              :items="operations"
              item-text="name"
              item-value="value"
              label="Operations"
              multiple
              class='mt-5'
              outlined
              ></v-select>

              <v-text-field
              v-model="maxOperations"
              label="Maximum number of operator nodes"
              v-on:keyup="loadExperiment"
              required
              ></v-text-field>
              <v-checkbox v-model="withRepetitions" label="Allow terminal nodes to repeat"
                @change="loadExperiment"
              ></v-checkbox>

            </v-col>
          </v-col>
          <v-col md="8">
            <div class="overline ml-2"> <v-icon>mdi-dna</v-icon> Best DeoxyribonucleicAcid Fitness</div>
            <v-col cols="12" v-if="render">
              <v-list-item-subtitle class="mt-2"><b>fitness: </b> {{bestDna.score | percentage}} ||  <b> aproximation: </b> {{bestDna.genes.eval()}} </v-list-item-subtitle>

              <GChart type="WordTree"
              :data="data"
              :options="chartOptions"
              :settings="chartSettings"/>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
            <v-col md="6">
              <div class="overline ml-2"> <v-icon>mdi-chart-line</v-icon> Graphs Evolution</div>
              <v-col cols="12" v-if="render">
                  <apexchart width="100%" height="300" type="line"  :options="chartOptionsA"  :series="series"></apexchart>
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

import { GChart } from 'vue-google-charts'
import {EncoderSelectorGP} from '../gp/encoders'
import {DeoxyribonucleicAcidGP} from '../gp/dna'
import {OperatorSelector} from '../gp/trees'
import {Population} from '../ga/population'

export default{
  name:'GeneticProgramming',
  components: {
    GChart
  },
  data: () => ({
     targetgp:'65346',
     withRepetitions:true,
     maxOperations:25,
     renderMaxOperations:true,
     chartOptions: {
        wordtree: {
          format: 'implicit',
      }},
      chartOptionsA:{yaxis:{labels:{
          formatter: (value) => `${Math.round(value * 100, 2)} %`
      }}},
      terminals:'25, 7, 8, 100, 4, 2',
      chartSettings: { packages: ['wordtree', 'table'] },
      chartOptionsHM:{colors: ["#1976d2"]},
      seriesHM:[],
      ComputingHeatmap:false,
      render:false,
      targetEncoded:[],
      mutationRate:0.05,
      NumGenerations:100,
      ActualGeneration:0,
      NumPopulation:100,
      instanceOfEncoder:'',
      instanceOfPopulation:'',
      bestDna:'',
      populationSample:'',
      profit:0,
      weights:0,
      maxCapacity:0,
      series:[{name:'Fitness Evolution', data:[]}],
      experiments : [
        {name:'Find The Number', value:'findTheNumber'},
        {name:'Symbolic Regression', value:'Regressor'},
      ],
      operations : [
        {name:'Addition', value:'add'},
        {name:'Subtraction', value:'sub'},
        {name:'Multiplication', value:'mul'},
        {name:'Max', value:'max'},
        {name:'Division', value:'div'},
      ],
      experiment:'findTheNumber',
      operation:['add', 'sub', 'mul', 'max'],
      data:[
        ['AST']
      ]
    }),
    mounted() {
      this.loadExperiment()
    },
    methods:{
      resetValues: function(){
        this.render = false
        this.series[0]['data'] = []
        this.seriesHM = []
        this.ActualGeneration=0
        this.targetgp = '65346'
      },
      renderConditions: function(){
        return (this.targetgp.length > 0  &&
                this.terminals.length > 0 &&
                this.operation.length > 0)
      },
      buildEncoder: function(){
        let encoder = EncoderSelectorGP.get(this.experiment)
        let operations = this.operation.map(OperatorSelector.get)
        let terminals = this.terminals.split(',').map(parseFloat)
        return new encoder(operations, terminals,  0.3,
                          parseFloat(this.maxOperations),
                          this.withRepetitions)
      },
      loadExperiment: function() {
        if(this.renderConditions()){
          this.instanceOfEncoder = this.buildEncoder()
          this.targetEncoded = this.instanceOfEncoder.encode(
            this.targetgp
          )
          this.instanceOfPopulation = new Population(
            this.NumPopulation, this.targetEncoded, this.instanceOfEncoder,
            DeoxyribonucleicAcidGP
          )
          this.bestDna = this.instanceOfPopulation.getTheBest()
          this.data = this.bestDna.genes.toList()
          this.chartOptions.wordtree.word = this.bestDna.genes.value
          this.render = true
        }else{
          this.render = false
        }
      },
      updatePopulation: function() {
        if(this.renderConditions()){
          this.instanceOfPopulation.update(this.mutationRate)
          this.bestDna = this.instanceOfPopulation.getTheBest()
          this.data = this.bestDna.genes.toList()
          this.chartOptions.wordtree.word = this.bestDna.genes.value
          this.series[0]['data'].push(this.bestDna.score)
          this.ActualGeneration += 1
          this.render = true
        }else{
          this.render = false
        }
      },
      runAlgorithm: function() {
        if(this.renderConditions()){
          for (var i = 0; i < this.NumGenerations; i++) {
            if(this.bestDna.score == 1)
              break
            this.updatePopulation()
          }
        }
      },
      heatMapGenerator: function(){
        let population = Array.from({length: 20}, (x, i) => (i + 1) * 50)
        let mutationRates = Array.from({length: 10}, (x, i) => (i + 1) / 10)

        for (var i = 0; i < population.length; i++) {
          let data = []
          for (var j = 0; j < mutationRates.length; j++) {
              let instanceOfPopulation =  new Population(
                population[i], this.targetEncoded, this.instanceOfEncoder,
                DeoxyribonucleicAcidGP
              )

              for (var k = 0; k < 100; k++) {
                if(this.bestDna.score == 1)
                  break
                instanceOfPopulation.update(mutationRates[j])
              }
              console.log(population[i], mutationRates[j])

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
      updateBestFitter:function(){
      }

    },
    filters: {
      percentage: function (value) {
        return `${value.toFixed(6) * 100} %`
      }
    }
  }
  </script>
