const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 100 },
    description: { type: String, maxlength: 300 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

categorySchema.index({ name: 1 }, { unique: true });
module.exports = mongoose.model('Category', categorySchema);
