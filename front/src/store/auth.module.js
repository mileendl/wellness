import AuthService from '../services/auth.service';
const userData = JSON.parse(localStorage.getItem('userData'));

var initialState = userData
    ? { status: { loggedIn: true }, user: userData.user, accessToken: userData.accessToken }
    : { status: { loggedIn: false }, user: null, accessToken: null };

// var initialState;
// if (userData) {
//     initialState = { status: { loggedIn: true }, user: userData.user, accessToken: ''}
//     if (userData.accessToken) {
//         initialState.accessToken = userData.accessToken
//     }
// } else{

// }

const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                data => {
                    commit('loginSuccess', data);
                    return Promise.resolve(user);
                },
                error => {
                    console.log(error)
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    // Promise - объект, представляющий результат успешного или неудачного завершения операции.
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: { // Мутации. Позволяют изменять состояние хранилища во Vuex. Сохраняют данные пользователя в локальное хранилище в браузере. Также удаляют данные пользователя
        loginSuccess(state, data) {
            state.status.loggedIn = true;
            state.user = data.user;
            state.accessToken = data.accessToken;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.accessToken = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.accessToken = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = true;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
}

export default auth;