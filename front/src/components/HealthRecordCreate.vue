<template>
    <form class="review-form" @submit="createRecord">
        <span>Введите для какого gjrfpfntkz ds ddjlbnt lfyyst:</span>
        <p style="white-space: pre-line;">{{ message }}</p>
        <div id="app">
            <select name="indicators" id="health_indicators" v-model="form.indicator">
                <option v-for="indicator in health_indicators" :key="indicator.id">{{indicator.data_type+","+ indicator.unit}}</option>
            </select>
        </div>
        <input placeholder="Введите данные" v-model="form.value">
        <p>
            <input type="submit" value="Submit">  
        </p>
    </form>
</template>
<script> 

    export default {
    name: 'HealthRecordCreate',
    //Статические 
    data() {
    return {
      form: {
        value: '',
        indicator: '',
        date: new Date(),
        user: '',
      },
      message: '',
      health_indicators: this.$store.getters.getDefaultData.health_indicators
    }
  },
  mounted() {
  },
    methods: {
        //err
        createRecord(err) {
            err.preventDefault();
            this.message = '';
            this.$store.dispatch("createrecord", this.form).then(data => {
                this.message = data.msg;
                this.$router.push('/healthRecords');
            }).catch((err)=>{
                this.message =err.response.data;
            })
        }
    }
    }   

</script>