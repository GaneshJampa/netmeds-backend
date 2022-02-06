const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define our model
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

mongoose.model('User', userSchema);