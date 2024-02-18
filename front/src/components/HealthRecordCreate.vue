<template>
  <form class="review-form" @submit="createRecord">
    <span>Введите для какого показателя вы вводите данные:</span>
    <p style="white-space: pre-line">{{ message }}</p>
    <div id="app">
      <select name="indicators" id="health_indicators" v-model="indicator">
        <option v-for="indicator in health_indicators" :key="indicator.id">
          {{ indicator.data_type + "," + indicator.unit }}
        </option>
      </select>
    </div>
    <input placeholder="Введите данные" v-model="form.value" />
    <p>
      <input type="submit" value="Ввод" />
    </p>
  </form>
</template>
<script>
import dds from "../services/default_data.service";

function getHealthIndicators() {
  return dds.getHealthIndicators().then((res) => {
    console.log(res);
    return res;
  });
}

export default {
  name: "HealthRecordCreate",
  //Статические
  data() {
    return {
      form: {
        value: "",
        indicator: "",
        date: new Date(),
      },
      message: "",
      health_indicators: [],
    };
  },
  mounted() {},
  beforeMount: function () {
    getHealthIndicators().then((res) => {
      console.log(res);
      this.health_indicators = res;
    });
  },
  methods: {
    createRecord(err) {
      err.preventDefault();
      this.message = "";
      this.$store
        .dispatch("/createrecord", this.form)
        .then((data) => {
          this.message = data.msg;
          this.$router.push("/healthRecords");
        })
        .catch((err) => {
          this.message = err.response.data;
        });
    },
  },
};
</script>