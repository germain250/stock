const eventBus = require('./eventBus');
const Notification = require('../models/Notification');
const ActivityLog = require('../models/ActivityLogger');
let io;

function initializeSocket(socketInstance) {
  io = socketInstance;

  // Listen for new client connections
  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Join a notification room (optional)
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room: ${room}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const handleStockEvent = async (action, product, quantity, user) => {
  try {
    const message = `${quantity} units of ${product} have been ${action} by ${user.name}.`;
    const notification = await Notification.create({ message });
    await ActivityLog.create({ action, product, quantity, user });

    // Emit notification to all connected clients
    io.emit('notification', notification);
  } catch (error) {
    console.error(`Error handling ${action} event:`, error);
  }
};

// Event listeners
eventBus.on('stockInCreate', (data) => handleStockEvent('added to stock', data.product, data.quantity, data.user));
eventBus.on('stockInUpdate', (data) => handleStockEvent('updated in stock', data.product, data.quantity, data.user));
eventBus.on('stockInDelete', (data) => handleStockEvent('deleted from stock', data.product, data.quantity, data.user));
eventBus.on('stockOutCreate', (data) => handleStockEvent('removed from stock', data.product, data.quantity, data.user));
eventBus.on('stockOutUpdate', (data) => handleStockEvent('updated in stock', data.product, data.quantity, data.user));
eventBus.on('stockOutDelete', (data) => handleStockEvent('deleted from stock', data.product, data.quantity, data.user));

// Handle low stock events
eventBus.on('lowStock', async (product) => {
  try {
    const notification = await Notification.create({
      message: `Warning: Low stock for ${product.name}. Only ${product.stockQuantity} units left.`,
    });

    // Emit notification to all connected clients
    io.emit('notification', notification);
  } catch (error) {
    console.error('Error handling lowStock event:', error);
  }
});

module.exports = { initializeSocket };
