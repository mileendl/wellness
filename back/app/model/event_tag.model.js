const { STRING, DOUBLE, DATE } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    var Tag = sequelize.define(
        'tag', {
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
        color: {
            type: Sequelize.STRING(100),
        }
    });
    Tag.associate = (models) => {
        Tag.hasMany(models.event, {
            foreignKey: 'tag_id',
            // onDelete: 'CASCADE',
            // onUpdate: 'CASCADE',
            sourceKey: 'id'
        });
    };
    return Tag;
}