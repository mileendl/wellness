<template>
    <div>
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

        <div>
            <h5>Иллюстрации</h5>
            <!-- Карусель с иллюстрациями -->
            <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button v-for="(exercise, index) in program.exercises" :key="exercise.id" type="button"
                        data-bs-target="#carouselExampleIndicators" v-bind:data-bs-slide-to="index"
                        :class="isActiveCarousel(index)" aria-current="true" v-bind:aria-label="exercise.name"></button>
                </div>
                <div class="carousel-inner">
                    <div v-for="(exercise, index) in program.exercises" :key="exercise.id"
                        :class="'carousel-item ' + isActiveCarousel(index)">
                        <img v-bind:src="imgHost + program.img_folder + '/' + exercise.img" class="d-block w-100" alt="...">
                        <div class="carousel-caption d-none d-md-block">
                            <h5 v-text="exercise.name"></h5>
                        </div>

                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import dds from '../services/default_data.service'
import config from '../config/config'

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
            program: {},
            imgHost: config.hostname + '/img/',
        }
    },
    methods: {
        //Делает первое изображение карусели активным, остальные — нет (менее косытльного способа не найдено)
        isActiveCarousel(index) {
            var res = ' ';
            if (index == 1) {
                res += 'active';
            }
            return res;
        }
    },
    beforeMount: function () {
        getProgram(this.$route.params.id).then((res) => {
            this.program = res;
        });
    }
}
</script>