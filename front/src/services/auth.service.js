import http from '../http-common'
// import http from "axios"

function login(user) {
    var loginData = {
        username: user.username,
        password: user.password
    }
    return http.post('/login', loginData).then(response => {
        // console.log(response.data)
        if (response.data.accessToken) {
            localStorage.setItem('userData', JSON.stringify(response.data))
        }
        return response.data;
    })
}

function logout() {
    localStorage.removeItem('userData');
}
function register(user) {
    var registerData = {
        username: user.username,
        password: user.password,
        name: user.name
    }
    return http.post('/register', registerData);
}

export default {
    login: login,
    logout: logout,
    register: register
}

