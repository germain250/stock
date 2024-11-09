const mongoose = require('mongoose');

const stockInSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
});

stockInSchema.index({ product: 1, date: 1 });
module.exports = mongoose.model('StockIn', stockInSchema);
