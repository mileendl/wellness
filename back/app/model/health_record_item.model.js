const healthIndicatorModel = require("./health_indicator.model");
const health_indicatorModel = require("./health_indicator.model");
const { STRING, DOUBLE, DATE } = require("sequelize");

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
            value: {
                type: Sequelize.INTEGER(10),
                allowNull: false
            },
            date: {
                type: DATE,
                allowNull: false
            }
        });
    HealthRecord.associate = (models) => {
        HealthRecord.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    };

    HealthRecord.associate = (models) => {
        HealthRecord.belongsTo(models.health_indicator, {
            foreignKey: 'indicator_id'
        });
    };
    return HealthRecord;
};