module.exports = (sequelize, Sequelize) => {
    var Medication = sequelize.define(
        'medication', // определяем имя таблицы
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
    Medication.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        Medication.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return Medication;
};