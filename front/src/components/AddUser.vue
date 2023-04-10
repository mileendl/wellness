<template>
  <div class="container-sm" style="max-width: 480px;">

    <form class="m-4">
      <h1 class="h3 mb-3 fw-normal align-self-center" style="text-align: center;">Регистрация</h1>

      <div class="mb-3">
        <label class="form-label" for="loginInput">Логин</label>
        <input class="form-control" id="loginInput" placeholder="Login">
      </div>
      <div class="mb-3">
        <label class="form-label" for="floatingInput">Электронная почта</label>
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label class="form-label" for="floatingPassword">Пароль</label>
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
      </div>
      <div class="mb-3">
        <label class="form-label" for="repeatPassword">Повторите Пароль</label>
        <input type="password" class="form-control" id="repeatPassword" placeholder="Repeat Password">
      </div>

      <div class="checkbox mb-3 " style="text-align: center;">
        <input type="checkbox" id="checkRemember" value="remember-me" style="scale: 2; margin-right: 0.7rem;">
        <label class="form-label" for="checkRemember"> Запомнить меня</label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" type="submit">Создать учетную запись</button>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>