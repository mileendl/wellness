import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import Calendar from "./components/CalendarPage";
import AddUser from "./components/AddUser";


// определяем маршруты
const routes = [
    {
        path: "/calendar", // указание маршрута, по которому будем переходить к списку пользователей
        name: "calndar", // имя маршрута
        component: Calendar, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Календарь"
        }
    },
    {
        path: "/addUser",
        name: "add-user",
        component: AddUser,
        meta: {
            title: "Добавление пользователя"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;