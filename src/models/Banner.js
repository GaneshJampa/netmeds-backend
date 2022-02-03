const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const bannerSchema = new Schema({
  bannerImage: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: true
  },
  linkedToUrl: {
    type: String,
    required: true
  },
  createdAt : { type : Date, default: Date.now },
  updatedAt : { type : Date, default: Date.now }
});

mongoose.model('Banner', bannerSchema);
