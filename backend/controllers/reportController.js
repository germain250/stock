const ActivityLogger = require('../models/ActivityLogger')

const getAllLogs = async(req,res) => {
    try {
        logs = await ActivityLogger.find({ user: req.user.id })
        res.json(logs)
    } catch (error) {
        res.json({ message: error.message })        
    }
}

const getAllNotifications = async(req,res) => {
    try {
        notifications = await Notification.find({ user: req.user.id })
        res.json(notifications)
    } catch (error) {
        res.json({ message: error.message })   
    }
}

module.exports = {
    getAllLogs,
    getAllNotifications,
}