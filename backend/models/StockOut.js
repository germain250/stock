const mongoose = require('mongoose');
const Product = require('./Product');

const stockOutSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    removedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

stockOutSchema.pre('save', async function (next) {
    try {
        const product = await Product.findById(this.product);
        if (!product) throw new Error('Product not found');

        if (this.isNew) {
            if (product.stockQuantity < this.quantity) {
                throw new Error('Insufficient stock');
            }
            product.stockQuantity -= this.quantity;
        } else {
            const original = await this.constructor.findById(this._id);
            const quantityDifference = this.quantity - original.quantity;
            if (product.stockQuantity < quantityDifference) {
                throw new Error('Insufficient stock for update');
            }
            product.stockQuantity -= quantityDifference;
        }

        await product.save();
        next();
    } catch (error) {
        next(error);
    }
});

stockOutSchema.pre('remove', async function (next) {
    try {
        const product = await Product.findById(this.product);
        if (!product) throw new Error('Product not found');

        product.stockQuantity += this.quantity;
        await product.save();
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('StockOut', stockOutSchema);
