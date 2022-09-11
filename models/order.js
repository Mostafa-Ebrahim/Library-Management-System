const sequelize = require('sequelize');
const database = require('../util/database');

const order = database.define('order', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = order;