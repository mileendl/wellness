<template>
    <div class="container-sm" style="max-width: 480px;">

        <form class="m-4" @submit="handleLogin">
            <h1 class="h3 mb-3 fw-normal align-self-center" style="text-align: center;">Вход в учетную запись</h1>

            <div class="mb-3">
                <label class="form-label" for="loginInput">Логин</label>
                <input class="form-control" id="loginInput" placeholder="Login" v-model="user.username">
            </div>
            <div class="mb-3">
                <label class="form-label" for="floatingPassword">Пароль</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="user.password">
            </div>
            <!-- <div class="checkbox mb-3 " style="text-align: center;">
          <input type="checkbox" id="checkRemember" value="remember-me" style="scale: 2; margin-right: 0.7rem;" v-model="rememberMe">
          <label class="form-label" for="checkRemember"> Запомнить меня</label>
        </div> -->
            <button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
            <div class="form-group">
                <div v-if="message" class="alert alert-danger">{{ message }}</div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LogIn',
    //Статические переменные
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            message: '',

        }
    },
    //Вычисляемые динамически переменные
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    //Компонент отрисован (не совсем, но ладно)
    mounted() {
        if (this.loggedIn) {
            //Направляет пользователя на представление '/calendar'
            this.$router.push('/calendar');
        }
    },
    methods: {
        //err
        handleLogin(err) {
            err.preventDefault();
            this.message = '';
            // обращаемся к методу register, который определён в auth.service.js
            this.$store.dispatch("auth/login", this.user).then(data => {
                this.message = data.message;
                // this.successful = true;
            }).catch(err => {
                this.message = err.response.data.message;
            })
        }
    }
}
</script>