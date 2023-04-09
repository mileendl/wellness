module.exports = (app) => {

    const user = require('../controller/user.controller');
    
    // Получение всех пользователей
    app.get('/api/users', user.findAll);
};