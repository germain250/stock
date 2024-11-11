// listeners.js
const eventBus = require('./eventBus');
const Notification = require('../models/Notification');
const ActivityLog = require('../models/ActivityLogger');
let io;

function initializeSocket(socketInstance) {
    io = socketInstance;
}

const handleStockEvent = async (action, product, quantity, user) => {
    try {
        const message = `${quantity} units of ${product} have been ${action} by ${user.name}.`;
        const notification = await Notification.create({ message });
        await ActivityLog.create({ action, product, quantity, performedBy: user });

        io.emit('notification', notification);
    } catch (error) {
        console.error(`Error handling ${action} event:`, error);
    }
};

eventBus.on('stockInCreate', (data) => handleStockEvent('added to stock', data.product, data.quantity, data.user));
eventBus.on('stockInUpdate', (data) => handleStockEvent('updated in stock', data.product, data.quantity, data.user));
eventBus.on('stockInDelete', (data) => handleStockEvent('deleted from stock', data.product, data.quantity, data.user));
eventBus.on('stockOutCreate', (data) => handleStockEvent('removed from stock', data.product, data.quantity, data.user));
eventBus.on('stockOutUpdate', (data) => handleStockEvent('updated in stock', data.product, data.quantity, data.user));
eventBus.on('stockOutDelete', (data) => handleStockEvent('deleted from stock', data.product, data.quantity, data.user));

eventBus.on('lowStock', async (product) => {
    try {
        const notification = await Notification.create({ 
            message: `Warning: Low stock for ${product.name}. Only ${product.stockQuantity} units left.` 
        });
        io.emit('notification', notification);
    } catch (error) {
        console.error('Error handling lowStock event:', error);
    }
});

eventBus.on('productCreated', async(data)=>{
    const notification = await Notification.create({
        message: `New product created: ${data.name}.`
    })
})

module.exports = { initializeSocket };
