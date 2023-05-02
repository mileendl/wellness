import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'

import router from './router'
import store from './store'

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('loadDefaultData');

app.mount('#app');
