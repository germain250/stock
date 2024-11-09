const mongoose = require('mongoose');

const stockOutSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    removedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

stockOutSchema.index({ product: 1, date: 1 });
module.exports = mongoose.model('StockOut', stockOutSchema);
