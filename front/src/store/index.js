import { createStore } from "vuex";
import auth from './auth.module';
import ddService from '../services/default_data.service';

const store = createStore({
    modules: {
        auth
    },
    state:{defaultdata:{}},
    mutations:{
        setDefaultData(state, data){
            state.defaultdata=data;
        }
    },
    getters:{
        getDefaultData(state){
            return state.defaultdata;
        }
    },
    actions:{
        loadDefaultData({ commit }, dd) {
            return ddService.getDefaultData().then(
                data => {
                    commit('setDefaultData', data);
                    return Promise.resolve(dd);
                }
            );
        }
    }
});
export default store;
