<template>
    <form class="review-form" @submit="handleRecord">
        <span>Введите для какого :</span>
        <p style="white-space: pre-line;">{{ message }}</p>
        <div id="app">
            <input type="text" v-model="indicator" list="health_indicators">
            <datalist id="health_indicators">
                <option v-for="indicator in health_indicators" :key="indicator.id">{{indicator.data_type+","+ indicator.unit}}</option>
            </datalist>
        </div>
        <input v-model="message" placeholder="введите данные">
        <p>
            <input type="submit" value="Submit">  
        </p>
    </form>
</template>
<script> 

    export default {
    name: 'HealthRecordCreate',
    //Статические переменные
    data() {
        return {
            health_indicators: this.$store.getters.getDefaultData.indicators
        }
    },
    methods: {
        //err
        handleRecord(err) {
            err.preventDefault();
            this.message = '';
            // обращаемся к методу register, который определён в auth.service.js
            this.$store.dispatch("auth/login", this.user).then(data => {
                this.message = data.msg;
                console.log(data);
                //Перенаправляет на календарь
                this.$router.push('/calendar');
                // this.successful = true;
            }).catch((err)=>{
                this.message =err.response.data;
            })
        }
    }
    }   

</script>