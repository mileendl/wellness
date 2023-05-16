import AuthService from '../services/auth.service';
const userData = JSON.parse(localStorage.getItem('userData'));

var initialState = userData
    ? { status: { loggedIn: true }, user: userData.user, accessToken: userData.accessToken }
    : { status: { loggedIn: false }, user: null, accessToken: null };

const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                data => {
                    commit('loginSuccess', data);
                    //commit('setUserData', data.userData, { root: true })
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            ).catch(err => {
                throw (err);
            });
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess', response);
                    // Promise - объект, представляющий результат успешного или неудачного завершения операции.
                    return Promise.resolve(response);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            ).catch(err => {
                throw (err);
            });
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
        //На всякий случай отдельно от loginSuccess, вдруг понадобится в будущем
        registerSuccess(state, data) {
            state.status.loggedIn = true;
            state.user = data.user;
            state.accessToken = data.accessToken;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    },
    getters: {
        getLoggedIn(state) {
            return state.status.loggedIn;
        },
    }

}

export default auth;