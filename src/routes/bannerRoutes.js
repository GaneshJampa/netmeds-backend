const req = require('express/lib/request');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
})

const fileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB only
  },
  fileFilter: fileFilter
})

const bannersController = require('../controllers/bannersController');

module.exports = (app) => {
  //adaptive practive routes
  app.get('/banners', bannersController.index);
  app.get('/banners/:id', bannersController.show);
  app.post('/banners', upload.single('bannerImage'), bannersController.create);
  app.put('/banners/:id', upload.single('bannerImage'), bannersController.update);
  app.delete('/banners/:id', bannersController.destroy);
}
