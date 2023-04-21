const { STRING, DOUBLE, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    var Exercise = sequelize.define(
        'exercise', {
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
            type: Sequelize.STRING(500), // тип данных STRING (в MySQL — VARCHAR)
            allowNull: false
        },
        img: {
            type: STRING,
            allowNull: true
        }
    });
    Exercise.associate = (models) => {
        Exercise.belongsTo(models.training_program, {
            foreignKey: 'training_program_id'
        });
    };
    return Exercise;
}