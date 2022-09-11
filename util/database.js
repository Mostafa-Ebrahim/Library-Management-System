const sequelize = require('sequelize');

const database = new sequelize(
    'library_database',
    'root',
    '0000',
    { dialect: 'mysql', host: 'localhost' }
);

module.exports = database;