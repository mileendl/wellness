<template>
    <div class="container">
        <h2 class="dispaly-6" v-text="program.name"></h2>
        <small class="text-muted">Программа тренировок</small>
        <div v-text="program.description" class="lead mt-3 mb-3"></div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Упражнение</th>
                    <th scope="col">Тренировочная норма</th>
                    <th scope="col">Описание</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(exercise, index) in program.exercises" :key="exercise.id">
                    <th scope="row" v-text="index"></th>
                    <td v-text="exercise.name"></td>
                    <td v-text="exercise.norm" style="white-space: pre-line"></td>
                    <td v-text="exercise.description"></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
import dds from '../services/default_data.service'

function getProgram(id) {
    return dds.getTrainingProgram(id).then(res => {
        return res;
    });
}

export default {
    name: 'TrainingProgram',
    //Статические переменные
    data() {
        return {
            program: {}
        }
    },
    methods: {
    },
    beforeMount: function () {
        getProgram(this.$route.params.id).then((res) => {
            this.program = res;
            console.log(res.exercises)
        });
    }
}
</script>