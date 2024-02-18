<template>
  <div class="container-sm" style="max-width: 480px;">

    <form class="m-4 needs-validation" id="registerForm" @submit="handleRegister" novalidate>
      <h1 class="h3 mb-3 fw-normal align-self-center" style="text-align: center;">Регистрация</h1>

      <div class="mb-3">
        <label class="form-label" for="loginInput">Логин</label>
        <input class="form-control" id="loginInput" placeholder="Login" v-model="user.username" required>
        <div class="invalid-feedback">
          Логин не может быть пустым!
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="floatingPassword">Пароль</label>
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="user.password"
          required>
        <div class="invalid-feedback">
          Пароль не может быть пустым!
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="repeatPassword">Повторите Пароль</label>
        <input type="password" class="form-control" id="repeatPassword" placeholder="Repeat Password"
          v-model="repeatPassword" required>
        <div class="invalid-feedback">
          {{ repeatPasswordMsg }}
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="nameInput">ФИО</label>
        <input class="form-control" id="nameInput" placeholder="ФИО" v-model="user.name" required>
        <div class="invalid-feedback">
          ФИО не может быть пустым!
        </div>
      </div>
      <!-- <div class="checkbox mb-3 " style="text-align: center;">
        <input type="checkbox" id="checkRemember" value="remember-me" style="scale: 2; margin-right: 0.7rem;" v-model="rememberMe">
        <label class="form-label" for="checkRemember"> Запомнить меня</label>
      </div> -->
      <div class="form-group mb-3">
        <div v-if="message" class="alert alert-danger">{{ message }}</div>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Создать учетную запись</button>

    </form>
  </div>
</template>
  
<script>
export default {
  name: 'RegisterUser',
  //Статические переменные
  data() {
    return {
      user: {
        username: '',
        password: '',
        name: '',
      },
      repeatPassword: '', //Повторный ввод пароля
      message: '',
      repeatPasswordMsg: ''
    }
  },
  //Вычисляемые динамически переменные
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    passwordRepCorrect() {
      return this.repeatPassword === this.user.password;
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
    handleRegister(error) {
      error.preventDefault();

      //Валидация формы
      const form = document.getElementById('registerForm');
      this.message = '';
      if (!this.passwordRepCorrect) {
        this.repeatPasswordMsg = 'Введенные пароли не совпадают!';
        form.classList.add('was-validated');
        return;
      }
      if (!form.checkValidity()) {
        error.preventDefault();
        error.stopPropagation();
        form.classList.add('was-validated');
        return null;
      }
      // обращаемся к методу register, который определён в auth.service.js
      this.$store.dispatch("auth/register", this.user).then(() => {
        // this.message = data.message;
        this.$router.push('/calendar');
      }).catch(err => {
        switch (err.response.status) {
          case 400: this.message = 'Пользователь с таким логином уже существует!';
            break;
          case 500: this.message = 'Не удалось создать пользователя. Внутренняя ошибка сервера.';
            break;
          default: this.message = err.response.statusText;
        }
      })
    }
  }
}
</script>