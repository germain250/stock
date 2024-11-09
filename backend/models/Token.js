const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    status: { type: String, enum: ['active', 'expired'], default: 'active' }
});

module.exports = mongoose.model('Token', tokenSchema);
