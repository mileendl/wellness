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
                    <td v-text="record.indicator_id"></td>
                    <td v-text="record.date"></td>
                    <td v-text="record.value" ></td>
                    <td v-text="record.indicator_id"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import dds from '../services/default_data.service'

function getHealthIndicators() {
   return dds.getHealthIndicators().then(res => {
    console.log(res)
       return res;
   });
}

function getHealthRecords() {
    return dds.getHealthRecords().then(res => {
        console.log(res);
        return res;
    });
}

export default {
    
    name: 'HealthRecords',
    //Статические переменные
    data() {
        return {
            records: this.$store.getters.getDefaultData.health_records,
            indicators: this.$store.getters.getDefaultData.health_indicators
        }
    },
    mounted: function () {
        
    },
    beforeMount: function () {
        getHealthIndicators().then((res) => {
            console.log(res)
            this.indicators = res;
        });
        getHealthRecords().then((res) => {
            this.records = res;
        });
    }
    }
</script>