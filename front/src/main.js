import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import router from './router'
import store from './store'

const app = createApp(App);

app.use(router);
app.use(store);

//Сначала получаем данные, потом монтируем (иначе теги и показатели, например, не успевают загрузиться)
store.dispatch('loadDefaultData').then(() => {
    app.mount('#app');
});
// app.mount('#app');