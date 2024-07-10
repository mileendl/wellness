<template>
  <div>
    <div class="g-3 row">
      <div class="col-auto">
        <label for="indicator-select" class="col-form-label"
          >Выберите показатель:
        </label>
      </div>

      <div class="col-auto">
        <select
          name="indicator-select"
          class="form-select"
          id="indicator-select"
          v-model="currentIndicator"
        >
          <option
            v-for="indicator in indicators"
            :key="indicator.id"
            :value="indicator"
            :text="indicator.data_type"
          ></option>
        </select>
      </div>
    </div>

    <Line id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "LineChart",
  components: { Line },
  data() {
    return {
      currentIndicator: "",
      records: [],
      indicators: [],
    };
  },

  methods: {
    getHealthIndicators() {
      return this.$store.getters.getDefaultData.health_indicators;
    },
    getHealthRecords() {
      return this.$store.getters.getHealthRecords;
    },
  },
  computed: {
    chartData() {
      console.log("lll");
      console.log(this.records);
      var values = [];
      var labels = [];
      for (var i = 0; i < this.records.length; i++) {
        var record = this.records[i];
        if (record.indicator_id == this.currentIndicator.id) {
          console.log("record");
          console.log(record);
          values.push(record.value);
          var label = new Intl.DateTimeFormat(["ban", "id"]).format(
            new Date(record.datetime)
          );
          labels.push(label);
        }
      }
      console.log(values);
      return {
        labels: labels,
        datasets: [
          {
            label:
              "" +
              this.currentIndicator.data_type +
              " " +
              this.currentIndicator.unit,
            data: values,
            backgroundColor: ["rgba(105, 0, 132, .2)"],
            borderColor: ["rgba(200, 99, 132, .7)"],
            borderWidth: 2,
          },
        ],
      };
    },
  },
  beforeMount: function () {
    var indicators = this.getHealthIndicators();
    var records = this.getHealthRecords();
    this.records = records;
    this.indicators = indicators;
    // for (var indicator in indicators) {

    // }
  },
};
</script>

<style scoped>
div {
  max-width: 300%;
  max-height: 100%;
}
</style>