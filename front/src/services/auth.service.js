import http from '../http-common'

function login(user) {
    var loginData = {
        username: user.username,
        password: user.password
    }
    return http.post('auth/login', loginData).then(response => {
        if (response.data.accessToken) {
            localStorage.setItem('userData', JSON.stringify(response.data));
            return response.data;
        }
    }).catch(err => {
        throw err;
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
    return http.post('auth/register', registerData).then(response => {
        if (response.status == 200) {
            if (response.data.accessToken) {
                localStorage.setItem('userData', JSON.stringify(response.data));
                return response;
            }
        }
    }).catch(err => {
        throw err;
    })
}

export default {
    login,
    logout,
    register
}

