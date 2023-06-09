const { STRING, DOUBLE, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    var HealthIndicator = sequelize.define(
        'health_indicator', {
        id: {
            type: Sequelize.INTEGER(10),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        //тип заносимых данных
        data_type: {
            type: STRING,
            allowNull: false
        },
        unit: {
            type: STRING,
            allowNull: false
        }
    });
    HealthIndicator.associate = (models) => {
        HealthIndicator.hasMany(models.health_record_item, {
            foreignKey: 'indicator_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return HealthIndicator;
}

