const req = require('express/lib/request');

const ordersController = require('../controllers/ordersController');

module.exports = (app) => {
  //adaptive practive routes 
  app.post('/orders', ordersController.create);
  app.delete('/orders/:id', ordersController.destroy);
}