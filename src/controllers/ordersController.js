const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');


// Create Order action
exports.create = function (req, res, next) {
    // Find user
    User.findOne({ _id: req.body.user })
        .then(user => {
            // Create order
            const order = new Order({
                user: user,
                products: req.body.products,
                status: "confirmed",
                total: req.body.total,
                paymentmode: "Cash on delivery",
                address: req.body.address,
            })
            order.save(function (error, savedOrder) {
                if (error) {
                    return res.status(422).send({ message: 'Unable to order', error: error })
                } else {
                    return res.status(200).send(savedOrder)
                }
            })
        })
        .catch(error => {
            console.log(error);
            return res.status(400).send({ error: 'Invalid User' });
        })
}

// Cancel Order action
exports.destroy = function (req, res, next) {
    // Cancel
    Order.findByIdAndDelete(req.params.id, req.body, function (error, Object) {
        if (error) {
            return res.status(422).send({ message: 'Unable to cancel this order', error: error })
        } else {
            return res.status(200).send({ success: 'Order cancelled successfully' });
        }
    })
}
