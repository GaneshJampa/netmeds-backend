const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const keys = require('../../config/keys');

// Register a User
exports.register = async (req, res) => {

    const useremail = await User.findOne({ email: req.body.email });

    const username = await User.findOne({ email: req.body.username });

    if (useremail || username) {
        return res.status(400).send("User already exists!")
    }

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            keys.SECRET_KEY
        ).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(200).send(user);
    } catch (err) {
        res.status(422).send(err);
    }
};


// Login a User
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send("Invalid Credentials!")
        }

        // decrypt the password to match with db password
        var bytes = CryptoJS.AES.decrypt(user.password, keys.SECRET_KEY);
        var originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if (originalPassword !== req.body.password) {
            return res.status(400).json("Invalid Credentials!");
        }

        // hide this info inside token id and isAdmin and signIn expires in 5d
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin },
            keys.SECRET_KEY,
            { expiresIn: keys.JWT_EXPIRE }
        )

        // to prevent to send password information in api
        const { password, ...info } = user._doc;

        return res.status(200).send({ ...info, accessToken });

    } catch (err) {
        console.log(err)
        return res.status(422).send(err);
    }
};


// user orders
exports.orders = function(req, res, next) {
    console.log(req.params.id)
    // Find category
    User.findOne({ _id: req.params.id })
    .then(user => {
      Order.find({ user: user }, function(error, orders) {
        if(error) {
          res.status(422).send({ error: 'Unable to fetch orders '})
        } else {
          res.status(200).send(orders)
        }
      })  
    })
    .catch(error => {
      return res.status(400).send({ error: 'Unable to find this user' });
    })
  }