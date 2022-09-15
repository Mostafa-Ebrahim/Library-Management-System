const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorController = require('./controllers/error');

const database = require('./util/database');
const product = require('./models/product');
const user = require('./models/user');
const cart = require('./models/cart');
const cartitem = require('./models/cart-item');
const order = require('./models/order');
const orderitem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use((req, res, next) => {
    user.findByPk(1)
        .then(newuser => {
            req.newuser = newuser;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

product.belongsTo(user, { constraints: true, onDelete: 'CASCADE' });
user.hasMany(product);
user.hasOne(cart);

cart.belongsTo(user);
cart.belongsToMany(product, { through: cartitem });
product.belongsToMany(cart, { through: cartitem });

order.belongsTo(user);
order.belongsToMany(product, { through: orderitem });
user.hasMany(order);



database
    .sync()
    .then(result => {
        return user.findOrCreate(
            { where: { id: 1, username: 'Mostafa-Ebrahim', email: 'mostafa-ebrahim@outlook.com' } }
        );
    })
    .then(([newuser, created]) => {
        fetchedUser = newuser;
        return newuser.getCart();
    })
    .then(cart => {
        if (!cart) {
            fetchedUser.createCart();
        }
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });

