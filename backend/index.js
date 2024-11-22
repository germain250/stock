const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io'); // Importing the correct Socket.IO server class
const routes = require('./routes/indexRoute');
const listeners = require('./services/listeners');
const Notification = require('./models/Notification');

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

// Server and Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update with your client origin
    methods: ['GET', 'POST'],
  },
});

// Database connection
mongoose
  .connect('mongodb://localhost:27017/stock_xy', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Initialize listeners
listeners.initializeSocket(io);

// REST API to fetch all notifications
app.get('/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }); // Sorted by most recent
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
