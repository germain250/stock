const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    details: { type: String },
    timestamp: { type: Date, default: Date.now }
});

activityLogSchema.index({ user: 1, timestamp: 1 });
module.exports = mongoose.model('ActivityLog', activityLogSchema);
