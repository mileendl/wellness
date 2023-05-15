import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import Calendar from "./components/CalendarPage";
import AddUser from "./components/AddUser";
import ChartDisplay from "./components/ChartDisplay";
import LogIn from "./components/LogIn"
import HealthRecordCreate from "./components/HealthRecordCreate"
import TrainingProgram from './components/TrainingProgram';
import TrainingPrograms from './components/TrainingPrograms';
import HealthRecords from './components/HealthRecords';

// определяем маршруты
const routes = [
    {
        path: "/calendar", // указание маршрута, по которому будем переходить к списку пользователей
        name: "calendar", // имя маршрута
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
    {
        path: "/chartdisplay",
        name: "chart-display",
        component: ChartDisplay,
        meta: {
            title: "График",
        }
    },
    {
        path: "/logIn",
        name: "login",
        component: LogIn,
        meta: {
            title: "Вход в учетную запись"
        }
    },
    {
        path: "/addHealthRecord",
        name: "add-health-record",
        component: HealthRecordCreate,
        meta: {
            title: "Добавление значения"
        }
    },
    {
        path: "/trainingPrograms",
        name: "training-programs",
        component: TrainingPrograms,
        meta: { title: 'Тренировочные программы' }
    },
    {
        path: "/trainingProgram/:id",
        name: "trainingProgram",
        component: TrainingProgram,
        meta: { title: 'Тренировочная программа' }
    },
    {
        path: "/healthRecords",
        name: "healthRecords",
        component: HealthRecords,
        meta: { title: 'Записи о здоровье' }
    }
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