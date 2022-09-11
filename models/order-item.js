const sequelize = require('sequelize');
const database = require('../util/database');

const orderitem = database.define('orderitem', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: sequelize.INTEGER
});

module.exports = orderitem;