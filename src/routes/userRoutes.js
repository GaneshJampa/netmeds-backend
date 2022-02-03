const req = require('express/lib/request');

const usersController = require('../controllers/usersController');

module.exports = (app) => {
  //adaptive practive routes 
  app.post('/register', usersController.register);
  app.post('/login', usersController.login);
}