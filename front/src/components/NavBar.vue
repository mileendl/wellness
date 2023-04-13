<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Navbar">
        <div class="container-fluid">
            <span class="navbar-brand">Wellness</span>
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarProper"
                aria-controls="navbarProper" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse collapse" id="navbarProper">
                <!-- <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"> -->

                <!-- Только для аутентифицированных бро -->
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="currentUser">
                    <li class="nav-item"><router-link to="/calendar"
                            class="nav-link px-2 text-secondary">Календарь</router-link></li>
                    <li class="nav-item"><router-link to="/addUser" class="nav-link px-2 text-white">Добавить</router-link>
                    </li>
                    <!-- <li class="nav-item"><a href="https://getbootstrap.com/docs/5.3/examples/headers/#"
                            class="nav-link px-2 text-white">Pricing</a></li>
                    <li class="nav-item"><a href="https://getbootstrap.com/docs/5.3/examples/headers/#"
                            class="nav-link px-2 text-white">FAQs</a>
                    </li>
                    <li class="nav-item"><a href="https://getbootstrap.com/docs/5.3/examples/headers/#"
                            class="nav-link px-2 text-white">About</a></li> -->
                </ul>

                <div v-if="currentUser" class="d-lg-flex justify-content-lg-end mb-2 mb-md-0">
                    <ul class="navbar-nav me-auto mb-md-0">
                        <li class="nav-item">
                            <span v-text="currentUser.username"></span>
                            <!-- <button type="button" class="btn btn-warning  m-1" @click="register">Зарегистрироваться</button> -->
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-outline-light  m-1" @click="logOut">Выйти</button>
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
                <!-- <div class="d-lg-flex justify-content-lg-end mb-2 mb-md-0">
                    <ul class="navbar-nav me-auto mb-md-0">
                        <li class="nav-item"><button type="button" class="btn btn-outline-light mb-2 mb-md-0 me-2">Войти</button></li>
                        <li class="nav-item"><button type="button" class="btn btn-warning">Зарегистрироваться</button></li>
                    </ul>
                </div> -->
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
            return this.$store.state.auth.user
        }
    },
    methods: {
        logIn(){
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
    mounted() {
        console.log(this.$store)
    }
}
</script>