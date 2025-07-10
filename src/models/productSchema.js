

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [String],
    stockQuantity: {
        type: Number,
        default: 0,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
