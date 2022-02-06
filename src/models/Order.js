const mongoose = require('mongoose');
const command = require('nodemon/lib/config/command');
const { Schema } = mongoose;

// Define our model
const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        _id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        mrp: {
            type: Number,
            required: true
        },
        sellPrice: {
            type: Number,
            required: true
        },
        productImage: {
            type: String,
            required: true
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        currentStock: {
            type: Number,
            default: 0
        },
        qty: {
            type: Number,
            default: 1
        },
        brandName: String,
        sellerName: String,
        ingredient: String,
    }],
    status: {
        type: String,
        required: true,
        default: "pending",
    },
    total: {
        type: Number,
        required: true
    },
    paymentmode: {
        type: String,
        default: "Cash on Delivery"
    },
    address: {
        housenumber: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

mongoose.model('Order', orderSchema);