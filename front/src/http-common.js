import axios from "axios";

import store from './store/index'

var token = '';
var user = JSON.parse(localStorage.getItem('userData'));

if (user && user.accessToken) {
  token = user.accessToken;
}

const ax = axios.create({

  baseURL: 'http://localhost:3000', //'http://192.168.3.26:3000',// указание адреса сервера
  headers: {
    "Content-Type": "application/json", // обмен данными будем осуществлять в формате json
    "Authorization": 'Bearer ' + token //Токен авторизации в заголовке
  },

});

//Провалил авторизацию — токен всё
ax.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status == 401) {
    store.dispatch('auth/logout');
    window.location.href = '/login';
  }
  throw error;
})

export default ax;