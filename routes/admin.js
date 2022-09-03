const path = require('path');
const express = require('express');
const router = express.Router();

const products = [];

router.get('/add', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add.html'));
});


router.post('/add', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

exports.routes = router;
exports.products = products;