import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import router from './router'
import store from './store'

const app = createApp(App);

app.use(router);
app.use(store);

// console.log(store)

app.mount('#app')
