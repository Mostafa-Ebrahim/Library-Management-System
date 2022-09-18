const sequelize = require('sequelize');
const database = require('../util/database');

const user = database.define('user', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: sequelize.STRING,
    password: sequelize.STRING
});

module.exports = user;