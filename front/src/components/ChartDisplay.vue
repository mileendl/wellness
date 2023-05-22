+<template>
    <div>
      <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      />
    </div>
    <div>
      <form>
        <label for="indicator-select">Выберите показатель</label>
        <select name="indicators" id="indicator-select">
          <option v-for="indicator in health_indicators" :key="indicator.id">{{indicator.data_type+","+ indicator.unit}}</option>
        </select>
        <input type="submit" value="Submit">
      </form>
    </div>
  </template>
  <script>
  import dds from '../services/default_data.service'

  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
  

function getHealthIndicators() {
   return dds.getHealthIndicators().then(res => {
    console.log(res)
       return res;
   });
}

/* function getHealthRecords() {
    return dds.getHealthRecords().then(res => {
        console.log(res);
        return res;
    });
} */

function decomposeRecordsIntoDates(records){
    var dates = [];
    for(let record in records ) dates.push(record.date)
    return dates;
  }

  function decomposeRecordsIntoValues(records){
    var values = [];
    for(let record in records ) values.push(record.value)
    return values;
  }

  function getRecordsByIndicator(id){
    return dds.getRecordsByIndicator(id).then(res => {
        return res;
    });
  }

  ChartJS.register(Title, Tooltip, Legend, LineElement,  PointElement, CategoryScale, LinearScale)
  
  export default {
    name: 'LineChart',
    
    components: { Line },
    data() {
      return {
        chartData: {
          labels: this.dates,
          datasets: [{
            label: ""+"",
            data: this.values,
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          }]
        },
        health_indicators: this.$store.getters.getDefaultData.health_indicators,    
      }
    },
 
    beforeMount: function () {
      getHealthIndicators().then((res) => {
            console.log(res)
            this.indicators = res;
        });
        
    },
    mounted: function () {
      getRecordsByIndicator(this.$route.params.id).then((res)=>{
          this.records=res;
          decomposeRecordsIntoDates(this.records).then((res)=>{
            this.dates=res;
          });
          decomposeRecordsIntoValues(this.records).then((res)=>{
            this.values=res;
          });
      });
    }
  }
  </script>
  <style scoped>
    div {
      max-width: 300%;
      max-height: 100%;
    }
  </style>