const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer')

const keys = require('./config/keys');

require('./src/models/Product');
require('./src/models/Category');
require('./src/models/Banner');
require('./src/models/User');
// Setup DB
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

// Setup App (Middleware)
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add all routes
require('./src/routes/productRoutes')(app);
require('./src/routes/categoryRoutes')(app);
require('./src/routes/bannerRoutes')(app);
require('./src/routes/userRoutes')(app);
require('./src/routes/authRoutes')(app);

// Setup Server
const port = 8080;
const server = http.createServer(app);

server.listen(port, "0.0.0.0");
console.log('Server listening on:', port);