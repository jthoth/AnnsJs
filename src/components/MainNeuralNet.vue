<template >
  <v-container fluid grid-list-xl>
    <v-row>
      <ControlPanel />
      <v-col cols="8" md="9">
        <v-card class="pa-2" raised tile>
          <div class="overline mb-4"> <v-icon>mdi-apache-kafka</v-icon> ARCHITECTURE</div>
          <GChart type="Sankey"
          :data="$store.getters.connections"
          :options="chartOptions"
          :settings="chartSettings"/>
          <div class="overline mb-2 mt-2"> <v-icon>mdi-poll</v-icon> SUMMARY</div>
          <v-row no-gutters>
            <v-col col="3">
              <v-card class="pa-2" flat tile>
                <div class="overline mb-2 mt-2"> Accuracy Train</div>
                <v-col class="display-2" cols="12">
                    {{$store.state.metrics[0]}} %
                </v-col>
              </v-card>
            </v-col>
            <v-col col="3">
              <v-card class="pa-2" flat tile>
                <div class="overline mb-2 mt-2"> Accuracy Test</div>
                <v-col class="display-2" cols="12">
                    {{$store.state.metrics[1]}} %
                </v-col>
              </v-card>
            </v-col>
            <v-col col="2">
              <v-card class="pa-2" flat tile>
              </v-card>
            </v-col>
            <v-col col="2">
              <v-card class="pa-2" flat tile>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import { GChart } from 'vue-google-charts'
import ControlPanel from './NeuralNetwork/ControlPanel'

export default{
  name:'MainNeuralNet',
  components: {
    ControlPanel,
    GChart
  },
  data() {
    return {
      chartOptions: {sankey: {node: { interactivity: true}},
                     height:500,
                     tooltip: { isHtml: true }},
      chartSettings: { packages: ['sankey', 'table'] },
    }
  }
}
</script>

<style>
div.google-visualization-tooltip {
  width:auto!important;
  height:auto!important;
}

.google-visualization-tooltip-item {
  margin: auto!important;
  padding: 0em 1em 0em 1em !important;
}

li.google-visualization-tooltip-item > span{
  font-size:11px!important;
  font-weight:bold;
  font-family: 'Roboto', sans-serif!important;
}
</style>
