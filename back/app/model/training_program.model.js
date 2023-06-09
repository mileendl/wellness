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
            name: {
                type: Sequelize.STRING(100), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: false
            },
            description: {
                type: Sequelize.STRING(100), // тип данных STRING (в MySQL — VARCHAR)
                allowNull: true
            },
            img_folder:{
                type: Sequelize.STRING(100),
            }
        });

    // Определяем связи таблицы user_category с другими таблицами
    TrainingProgram.associate = (models) => {
        // Определение связи один-ко-многим с таблицей user. Это определение связи с одной стороны.
        // Связь также определена со второй стороны (со стороны таблицы user): в файле user.model.js

        TrainingProgram.hasMany(models.exercise, {
            foreignKey: 'training_program_id'
        })
    };
    return TrainingProgram;
};