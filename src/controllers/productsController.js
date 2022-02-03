const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const Product = mongoose.model('Product');

// List Products action
exports.index = function (req, res, next) {
  Product.find({}, function (error, objects) {
    if (error) {
      res.status(422).send({ error: 'Unable to fetch products ' })
    } else {
      res.status(200).send(objects)
    }
  })
}

// Show Product action
exports.show = function (req, res, next) {
  Product.findOne({ _id: req.params.id })
    .populate('category')
    .then(product => {
      return res.status(200).send(product);
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this resource' });
    })
}

// Create Product action
exports.create = function (req, res, next) {
  console.log(req.file);
  // Find category
  Category.findOne({ _id: req.body.category })
    .then(category => {
      // Create product
      const product = new Product({
        category: category,
        name: req.body.name,
        description: req.body.description,
        mrp: req.body.mrp,
        sellPrice: req.body.sellPrice,
        productImage: req.file.path,
        isPublished: req.body.isPublished,
        currentStock: req.body.currentStock,
        brandName: req.body.brandName,
        ingredient: req.body.ingredient,
        sellerName: req.body.sellerName
      })
      product.save(function (error, savedObject) {
        if (error) {
          return res.status(422).send({ message: 'Unable to save this product', error: error })
        } else {
          return res.status(200).send(savedObject)
        }
      })
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send({ error: 'Invalid Category' });
    })
}

// Update Product action
exports.update = function (req, res, next) {
  // Find category
  Category.exists({ _id: req.body.category })
    .then(exists => { 
      if (exists) {
        // Update product
        Product.findByIdAndUpdate(req.params.id, req.body, function (error, Object) {
          if (error) {
            return res.status(422).send({ message: 'Unable to update this product', error: error })
          } else {
            return res.status(200).send(Object)
          }
        })
      }
      else{
        return res.status(400).send({ error: 'Invalid Category' });
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(400).send({ error: 'Invalid Category' });
    })
}

// Delete Product action
exports.destroy = function (req, res, next) {
  // Delete product
  Product.findByIdAndDelete(req.params.id, req.body, function (error, Object) {
    if (error) {
      return res.status(422).send({ message: 'Unable to delete this product', error: error })
    } else {
      return res.status(200).send({success: 'Category deleted successfully'});
    }
  })
}
