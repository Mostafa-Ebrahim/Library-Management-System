const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const database = require('./util/database');
const product = require('./models/product');
const User = require('./models/user');
const cart = require('./models/cart');
const cartitem = require('./models/cart-item');
const order = require('./models/order');
const orderitem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(product);
User.hasOne(cart);

cart.belongsTo(User);
cart.belongsToMany(product, { through: cartitem });
product.belongsToMany(cart, { through: cartitem });

order.belongsTo(User);
order.belongsToMany(product, { through: orderitem });
User.hasMany(order);



database
    // .sync({ force: true })
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
