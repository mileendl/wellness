<template>
    <div class="container-sm" style="max-width: 480px;">

        <form class="m-4 needs-validation" id="loginForm" novalidate>
            <h1 class="h3 mb-3 fw-normal align-self-center" style="text-align: center;">Вход в учетную запись</h1>

            <div class="mb-3">
                <label class="form-label" for="loginInput">Логин</label>
                <input class="form-control" id="loginInput" placeholder="Login" v-model="user.username" required>
                <div class="invalid-feedback">
                    Логин не может быть пустым!
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label" for="floatingPassword">Пароль</label>
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    v-model="user.password" required>
                <div class="invalid-feedback">
                    Пароль не может быть пустым!
                </div>
            </div>
            <div class="form-group mb-3">
                <div v-if="message" class="alert alert-danger">{{ message }}</div>
            </div>
            <button class="w-100 btn btn-lg btn-primary" @click="handleLogin" type="submit">Войти</button>

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
    created() {
        if (this.loggedIn) {
            //Направляет пользователя на представление '/calendar'
            this.$router.push('/calendar');
        }
    },
    methods: {
        handleLogin: function (err) {
            err.preventDefault();

            //Валидация формы
            const form = document.getElementById('loginForm');
            if (!form.checkValidity()) {
                err.preventDefault()
                err.stopPropagation()
                form.classList.add('was-validated')
                return null;
            }

            this.message = '';
            // обращаемся к методу register, который определён в auth.service.js
            this.$store.dispatch("auth/login", this.user).then(data => {
                this.message = data.msg;
                console.log(data);
                //Перенаправляет на календарь
                window.location.href = '/calendar';
                // this.successful = true;
            }).catch((err) => {
                switch (err.response.status) {
                    case 404: this.message = "Неверный логин или пароль!";
                        break;
                    case 500: this.message = "Внутренняя ошибка сервера!"; break;
                    default: this.message = err.response.statusText;
                }

            })
        }
    }
}
</script>