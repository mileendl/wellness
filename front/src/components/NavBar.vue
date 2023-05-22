<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" style="width: 100%;" aria-label="Navbar">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Wellness</router-link>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarProper"
                aria-controls="navbarProper" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse" id="navbarProper">
                <!-- <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> -->

                <!-- Только для аутентифицированных бро -->
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item" v-if="currentUser">
                        <router-link to="/calendar" class="nav-link px-2 text-secondary">Календарь</router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link to="/addHealthRecord" class="nav-link px-2 text-white">Добавить значение</router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link to="/chartDisplay" class="nav-link px-2 text-white">График</router-link>
                    </li>
                    <li class="nav-item" v-if="currentUser">
                        <router-link to="/healthRecords" class="nav-link px-2 text-white">Показатели здоровья</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/trainingPrograms" class="nav-link px-2 text-white">
                            Программы тренировок</router-link>
                    </li>
                </ul>

                <div v-if="currentUser" class="d-lg-flex justify-content-lg-end mb-2 mb-md-0">
                    <ul class="navbar-nav me-auto mb-md-0">
                        <li class="nav-item">
                            <div class="nav-link px-2 text-white">
                                <!-- <i style="color: white;" class="bi bi-person-circle mr-3 "></i> -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                    class="bi bi-person-circle mx-2" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                                <span v-text="currentUser.username"></span>
                            </div>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-outline-danger  m-1" @click="logOut">Выйти</button>
                        </li>
                    </ul>
                </div>
                <div v-else class="d-lg-flex justify-content-lg-end mb-2 mb-md-0">
                    <ul class="navbar-nav me-auto mb-md-0">
                        <li class="nav-item">
                            <button type="button" class="btn btn-outline-light  m-1" @click="logIn">Войти</button>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-warning  m-1" @click="register">Зарегистрироваться</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: "NavBar",
    data() {
        return {}

    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logIn() {
            this.$router.push('/logIn');

        },
        logOut() {
            this.$store.dispatch('auth/logout');
            this.$router.push('/');
        },
        register() {
            this.$router.push('/addUser');
        }
    },
}
</script>