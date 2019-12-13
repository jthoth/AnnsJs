<template >
  <v-col cols="2" md="3">
      <v-card  class="pa-2" raised tile>
      <div class="overline mb-4"> <v-icon>mdi-database</v-icon> DATA</div>
      <v-col  cols="12">
          <v-select v-model="dataset" label="Dataset" item-text="name"
            item-value="value"
            :items="datasets"
            v-on:change="loadDataset"
            outlined>
          </v-select>
        <v-select v-model="normalizer" label="Normalization" item-text="name"
          item-value="value"
          :items="normalizers"
          v-on:change="loadDataset"
          outlined>
        </v-select>
        <div class="overline mb-4"> <v-icon>mdi-settings</v-icon> Settings</div>
        <tags-input element-id="tags" class="update-tag-style"
          v-model="$store.state.hiddens"
          :typeahead="false"
          placeholder="Add hidden layers"
          :allow-duplicates="true"
          @tags-updated="updateVisorNeuralNet">
        </tags-input>
        <v-select v-model="initializer" class="mt-7" label="Weight Initializer"
          item-text="name" v-on:change="updateVisorNeuralNet"
          item-value="value" :items="initializers" outlined >
        </v-select>
        <v-select v-model="activation" label="Activation Function"
            item-text="name" item-value="value"
             v-on:change="updateVisorNeuralNet"
            :items="activations" outlined>
        </v-select>
        <v-select v-model="costFunction" label="Cost Function" item-text="name"
          item-value="value" :items="costFunctions"
           v-on:change="updateVisorNeuralNet" outlined>
        </v-select>
        <label class="overline">Learning Reate {{lr}}</label>
        <v-slider v-model="lr" :max="1" :min="0" :step="0.001"></v-slider>
        <label class="overline">EPOCHS {{$store.state.epochs}}</label>
        <v-slider v-model="$store.state.epochs" :max="30" :min="0" :step="1"></v-slider>
    </v-col>
      <v-row no-gutters>
        <v-col col="4">  <v-btn block class="mb-2" @click="resetPage"> REFRESH </v-btn></v-col>
        <v-col col="4"> <v-btn block class="mb-2"  @click="initTest"> TEST </v-btn></v-col>
        <v-col col="4"><v-btn  block class="mb-2" @click="initTrain"> TRAIN </v-btn></v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default{
  name:'ControlPanel',
  data() {
    return {
      datasets : [
        {name:'Seeds', value:`${process.env.VUE_APP_ORIGIN}seeds_dataset.csv`},
        {name:'Iris', value:`${process.env.VUE_APP_ORIGIN}iris_dataset.csv`},
        {name:'Wine Quality', value:`${process.env.VUE_APP_ORIGIN}winequality.csv`},
      ],
      normalizers : [
        {name:'Max Min Norm', value:'maxMinNorm'},
        {name:'Z-Score Norm', value:'zScoreNorm'}
      ],
      initializers : [
        {name:'Xavier Uniform', value:'Uniform'},
        {name:'He Normal', value:'Normal'},
      ],
      activations : [
        {name:'Sigmoid', value:'Sigmoid'},
        {name:'Tangent', value:'Tanh'},
        {name:'Relu', value:'Relu'},
      ],
      costFunctions : [
        {name:'Mean Square Error', value:'SquareError'},
      ],
      lr:0.1,
      epochs:0,
      dataset:`${process.env.VUE_APP_ORIGIN}iris_dataset.csv`,
      normalizer: 'zScoreNorm',
      initializer: 'Normal',
      activation: 'Relu',
      costFunction: 'SquareError'
    }
  },
  mounted() {
    this.loadDataset()
  },
  methods:{
    loadDataset: function() {
      this.$store.commit('updateUrl', this.dataset)
      this.$store.commit('updateNormMethod', this.normalizer)
      this.$store.commit('updateInitMethod', this.initializer)
      this.$store.commit('updateActMethod', this.activation)
      this.$store.commit('updateCostMethod', this.costFunction)
      this.$store.commit('updateMetrics', [0, 0])
      this.$store.commit('updateEpochs', 0)
      this.$store.dispatch('loadData')
    },
    updateVisorNeuralNet: function() {
      this.$store.commit('updateMetrics', [0, 0])
            this.$store.commit('updateEpochs', 0)
      this.$store.dispatch('updateVisorNeuralNet')
    },
    initTrain: function() {
      this.$store.commit('updateLearningRate', this.lr)
      this.$store.commit('updateMetrics', [0, 0])
      this.$store.dispatch('trainNeuralNet')
    },
    initTest: function() {
      this.$store.dispatch('testNeuralNet')
    },
    resetPage: function(){
      location.reload()
    }
  }
}
</script>
