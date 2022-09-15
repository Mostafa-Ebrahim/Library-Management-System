const sequelize = require('sequelize');
const database = require('../util/database');

const cartitem = database.define('cartitem', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: sequelize.INTEGER
});

module.exports = cartitem;