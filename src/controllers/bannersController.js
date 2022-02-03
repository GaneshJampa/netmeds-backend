const mongoose = require('mongoose');
const Banner = mongoose.model('Banner');

// List Banners action
exports.index = function(req, res, next) {
  Banner.find({}, function(error, objects) {
    if(error) {
      res.status(422).send({ error: 'Unable to fetch banners '})
    } else {
      res.status(200).send(objects)
    }
  })
}

// Show Banner action
exports.show = function(req, res, next) {
  Banner.findOne({ _id: req.params.id })
    .then(banner => {
      return res.status(200).send(banner);
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this resource' });
    })
}

// Create Banner action
exports.create = function(req, res, next) {
    const banner = new Banner({
      bannerImage: req.file.path,
      isActive: req.body.isActive,
      linkedToUrl: req.body.linkedToUrl
    })
    banner.save(function(error, savedObject) {
      if(error) {
        return res.status(422).send({ message: 'Unable to save this banner', error: error })
      } else {
        return res.status(200).send(savedObject)
      }
    })
  }

// Update Banner action
exports.update = function(req, res, next) {
  // Update Banner
  Banner.findByIdAndUpdate(req.params.id, req.body, function (error, Object) {
    if (error) {
      return res.status(422).send({ message: 'Unable to update this banner', error: error })
    } else {
      return res.status(200).send(Object)
    }
  })
}

// Delete Banner action
exports.destroy = function(req, res, next) {
  // Delete Banner
  Banner.findByIdAndDelete(req.params.id, function (error, Object) {
    if (error) {
      return res.status(422).send({ message: 'Unable to delete this banner', error: error })
    } else {
      return res.status(200).send({success: 'Banner deleted successfully'});
    }
  })
}
