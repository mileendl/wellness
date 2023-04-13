import http from '../http-common'
// import http from "axios"

function login(user) {
    var loginData = {
        username: user.username,
        password: user.password
    }
    return http.post('/login', loginData).then(response => {
        if (response.data.accessToken) {
            localStorage.setItem(JSON.stringify(response.data))
        }
        return response.data;
    })
}

function logout() {
    localStorage.removeItem('user');
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

