<template>
    <form class="review-form" @submit="handleRecord">
        <span>Введите для какого :</span>
        <p style="white-space: pre-line;">{{ message }}</p>
        <div id="app">
            <input type="text" v-model="film" list="films">
            <datalist id="films">
                <option v-for="film in films" :key="film.id">{{film.name}}</option>
            </datalist>
        </div>
        <input v-model="message" placeholder="введите данные">
        <br>
        <span>Еденицы измерения:</span>
        <div id="app">
            <input type="text" v-model="film" list="films2">
            <datalist id="films2">
               <option v-for="film in films2" :key="film.id">{{film.name}}</option>
            </datalist>
        </div>
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
            films:[
                {name:"A Throne Too Far", id:1},
                {name:"The Cat Wasn't Invited", id:2},
                {name:"You Only Meow Once", id:3},
                {name:"Catless in Seattle", id:4}
            ],
            films2:[
                {name:"A Throne Too Far2", id:1},
                {name:"The Cat Wasn't Invited2", id:2},
                {name:"You Only Meow Once2", id:3},
                {name:"Catless in Seattle2", id:4}
            ]
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