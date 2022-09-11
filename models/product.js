const sequelize = require('sequelize')
const database = require('../util/database');


const Product = database.define('product', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  price: {
    type: sequelize.DOUBLE,
    allowNull: false
  },
  description: {
    type: sequelize.STRING,
    allowNull: false
  },
  imgurl: {
    type: sequelize.STRING,
    allowNull: false
  }
});


module.exports = Product