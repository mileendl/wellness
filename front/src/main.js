import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router from './router'

const app = createApp(App).use(router); // Создание экземпляра приложения
app.use(router);
createApp(App).use(router).mount('#app')
