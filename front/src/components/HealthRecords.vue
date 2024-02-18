<template>
  <div>
    <small class="text-muted">Записи о здоровье</small>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Показатель</th>
          <th scope="col">Дата</th>
          <th scope="col">Значение</th>
          <th scope="col">Ед. изм.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="record.id">
          <th scope="row" v-text="index"></th>
          <td v-text="record.health_indicator.data_type"></td>
          <td
            v-text="
              new Intl.DateTimeFormat(['ban', 'id']).format(record.datetime)
            "
          ></td>
          <td v-text="record.value"></td>
          <td v-text="record.health_indicator.unit"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "HealthRecords",
  //Статические переменные
  data() {
    return {
      records: [],
      indicators: [],
    };
  },
  methods: {
    getHealthIndicators() {
      console.log(this.$store.getters.getDefaultData.training_programs);
      return this.$store.getters.getHealthIndicators;
    },
    getHealthRecords() {
      return this.$store.getters.getHealthRecords;
    },
  },
  mounted: function () {
    this.records = this.getHealthRecords();
    this.indicators = this.getHealthIndicators();
  },
};
</script>