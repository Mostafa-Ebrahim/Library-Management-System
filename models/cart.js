const sequelize = require('sequelize');
const database = require('../util/database');

const cart = database.define('cart', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = cart;