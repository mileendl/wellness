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
        record_id: {
            type: Sequelize.INTEGER(10),
            allowNull: false
        },
        //тип заносимых данных
        data_type: {
            type: STRING(100),
            allowNull: false
        },
        unit: {
            type: STRING(100),
            allowNull: false
        },
        date: {
            type: DATE,
            allowNull: false
        }
    }
    );
    HealthIndicator.associate = (models) => {
        HealthIndicator.hasMany(models.health_indicator, {
            foreignKey: 'record_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
        HealthIndicator.belongsTo(models.health_record_item, {
            foreignKey: 'record_id'
        });
    };
    return HealthIndicator;
}