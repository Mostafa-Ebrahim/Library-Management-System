const database = require('../util/database');

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imgurl, description, price) {
    this.id = id;
    this.title = title;
    this.imgurl = imgurl;
    this.description = description;
    this.price = price;
  }

  save() {
    return database.execute('INSERT INTO library_database.products (title, price, description, imgurl) VALUES  (?, ?, ?, ?)', [this.title, this.price, this.description, this.imgurl]
    );
  }

  static deleteById(id) {

  }

  static fetchAll() {
    return database.execute('SELECT * FROM library_database.products;');
  }

  static findById(id) {
    return database.execute(`SELECT * FROM library_database.products WHERE id=${id};`);
  }
};
