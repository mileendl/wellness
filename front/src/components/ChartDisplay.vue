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
        <label for="indicator-select">Choose a pet:</label>
        <select name="indicators" id="indicator-select">
          <option v-for="indicator in health_indicators" :key="indicator.id">{{indicator.data_type+","+ indicator.unit}}</option>
        </select>
        <input type="submit" value="Submit">
      </form>
    </div>
  </template>
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, LineElement,  PointElement, CategoryScale, LinearScale)
  
  export default {
    name: 'LineChart',
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [{
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
              'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
              'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
          },
          {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: [
              'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
              'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
          }]
        },
        health_indicators: this.$store.getters.getDefaultData.indicators
      }
    }
  }
  ;
  </script>
  <style scoped>
    div {
      max-width: 300%;
      max-height: 100%;
    }
  </style>