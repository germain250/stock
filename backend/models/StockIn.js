const mongoose = require('mongoose');
const Product = require('./Product');

const stockInSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

stockInSchema.pre('save', async function (next) {
    try {
        const product = await Product.findById(this.product);
        if (!product) throw new Error('Product not found');

        if (this.isNew) {
            product.stockQuantity += this.quantity;
        } else {
            const original = await this.constructor.findById(this._id);
            const quantityDifference = this.quantity - original.quantity;
            product.stockQuantity += quantityDifference;
        }

        await product.save();
        next();
    } catch (error) {
        next(error);
    }
});

stockInSchema.pre('remove', async function (next) {
    try {
        const product = await Product.findById(this.product);
        if (!product) throw new Error('Product not found');

        product.stockQuantity -= this.quantity;
        await product.save();
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('StockIn', stockInSchema);
