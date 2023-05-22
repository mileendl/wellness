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
                    <td v-text="indicators[record.indicator_id].name"></td>
                    <td v-text="record.date"></td>
                    <td v-text="record.value" ></td>
                    <td v-text="record.indicator_id"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
//import dds from '../services/default_data.service'

//function getHealthIndicator(id) {
    //return dds.getHealthIndicator(id).then(res => {
      //  return res;
   // });
//}

export default {
    
    name: 'HealthRecords',
    //Статические переменные
    data() {
        return {
            records: {},
            indicators: {}
        }
    },
    methods: {
        getRecords() {
            console.log(this.$store.getters.getDefaultData.records);
            return this.$store.getters.getDefaultData.records;
        },

        getIndicators(){
            console.log( this.$store.getters.getDefaultData);
            console.log( this.$store.getters.getDefaultData.health_indicators);
            return this.$store.getters.getDefaultData.health_indicators;
        }
    },
    mounted: function () {
        this.records = this.getRecords();
        this.indicators = this.getIndicators();
        
    }
}
</script>