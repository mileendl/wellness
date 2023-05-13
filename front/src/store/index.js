import { createStore } from "vuex";
import auth from './auth.module';
import ddService from '../services/default_data.service';
// import erService from '../services/events_records.service'

const store = createStore({
    modules: {
        auth
    },
    state: {
        defaultdata: {},
        events: [],
        healthRecords: [],
    },
    mutations: {
        setDefaultData(state, data) {
            state.defaultdata = data;
        },
        //Для данных, пришедших с юзером
        setUserData(state, data) {
            state.events = data.events;
            state.healthRecords = data.healthRecords;
        },
        setEvents(state, events) {
            state.events = events;
        },
        setHealthRecords(state, health_records) {
            state.healthRecords = health_records;
        },
    },
    getters: {
        getDefaultData(state) {
            return state.defaultdata;
        },
        getHealthRecords(state){
            return state.healthRecords;
        },
        getEvents(state){
            return state.events;
        }
    },
    actions: {
        loadDefaultData({ commit }, dd) {
            return ddService.getDefaultData().then(
                data => {
                    console.log(data)
                    commit('setDefaultData', data);
                    return Promise.resolve(dd);
                }
            );
        },
        // saveEvent({ commit }, event) {
        //     console.log(event)
        //     erService.saveEvent(event).then(data => {
        //         return data;
        //     })
        // },
        // saveHealthRecord(, health_record) {
        //     erService.saveHealthRecord(health_record).then(data => {
        //         return data;
        //     })
        // }
    }
});
export default store;
