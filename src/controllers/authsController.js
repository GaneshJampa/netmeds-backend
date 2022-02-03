const mongoose = require('mongoose');
const User = mongoose.model('User');
const CryptoJS = require("crypto-js");

// Update
exports.update = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                // update first
                { $set: req.body },
                // then it show new data
                { new: true }

            );

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("You can update only your account!");
    }
};


// Delete
exports.delete =  async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account!");
    }
};

// Get One User
exports.user =  async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get All Users
exports.users =  async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            // find last 5 new users if query is given or show all users
            const users = query
                ? await User.find().sort({ _id: -1 }).limit(5)
                : await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to see all users!");
    }
};

// Get Users Stats
exports.stats =  async (req, res) => {


    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: `$createdAt` },
                },
            },
            {
                $group: {
                    _id: `$month`,
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
};
