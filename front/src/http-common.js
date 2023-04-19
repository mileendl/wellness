import axios from "axios";

var token = '';
var user = JSON.parse(localStorage.getItem('user'));
if (user && user.accessToken) {
  token = user.accessToken;
}

export default axios.create({

  baseURL: "http://localhost:3000/",//'http://192.168.3.26:8080/', // указание адреса сервера
  headers: {
    "Content-Type": "application/json", // обмен данными будем осуществлять в формате json
    "Authorization": token //Токен авторизации в заголовке
  },

});