module.exports = (sequelize, Sequelize) => {
    var TrainingProgram = sequelize.define(
        'training_program', // определяем имя таблицы
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
    TrainingProgram.associate = (models) =>  {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js
        TrainingProgram.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };
    return TrainingProgram;
};