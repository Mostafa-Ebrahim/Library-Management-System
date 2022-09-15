const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgurl = req.body.imgurl;
  const price = req.body.price;
  const description = req.body.description;
  req.newuser.createProduct({
    title: title,
    price: price,
    description: description,
    imgurl: imgurl,
    userId: req.user
  })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.newuser.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedimgurl = req.body.imgurl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imgurl = updatedimgurl;
      return product.save();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err)
    });
};

exports.getProducts = (req, res, next) => {
  req.newuser.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err)
    })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
