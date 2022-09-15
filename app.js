const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const session = require('express-session');
const errorController = require('./controllers/error');
=======
>>>>>>> parent of 2d1a80a (use ORM (sequelize))

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

<<<<<<< HEAD
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

=======
>>>>>>> parent of 2d1a80a (use ORM (sequelize))
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000);
