const req = require('express/lib/request');
const verify = require('../../verifyToken');
const authsController = require('../controllers/authsController');

module.exports = (app) => {
  //adaptive practive routes 
  app.put('/user/:id', verify , authsController.update);
  app.delete('/user/:id', verify , authsController.delete);
  app.get('/user/:id', verify , authsController.user);
  app.get('/users', verify , authsController.users);
  app.get('/users/stats', verify , authsController.stats);
}