module.exports = (sequelize, Sequelize) => {
    var HealthRecord = sequelize.define(
        'health_record', // определяем имя таблицы
        {
            id: {
                type: Sequelize.INTEGER(10),
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
        });

    // Определяем связи таблицы user_category с другими таблицами
    HealthRecord.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        HealthRecord.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return HealthRecord;
};