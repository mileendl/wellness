const { STRING, DOUBLE, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    var Event = sequelize.define(
        'event', {
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
            type: Sequelize.STRING(200), // тип данных STRING (в MySQL — VARCHAR)
            allowNull: false
        },
        datetime: {
            type: DATE,
            allowNull: false
        },
        isDismissed: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        }
    });
    Event.associate = (models) => {
        Event.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        Event.belongsTo(models.tag, {
            foreignKey: 'tag_id'
        })
    };
    return Event;
}