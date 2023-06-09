import { createStore } from "vuex";
import auth from './auth.module';
import ddService from '../services/default_data.service';
import erService from '../services/events_records.service'

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
        setHealthRecords(state, healthRecords) {
            state.healthRecords = healthRecords;
        },
    },
    getters: {
        getDefaultData(state) {
            return state.defaultdata;
        },
        getHealthRecords(state) {
            return state.healthRecords;
        },
        getEvents(state) {
            return state.events;
        }
    },
    actions: {
        async loadDefaultData({ commit },) {
            const data = await ddService.getDefaultData();
            commit('setDefaultData', data);
        },
        async loadUserData({ commit },) {
            const data = await erService.getAllEventsAndRecords();
            commit('setUserData', data);
        },
    }
});
export default store;
