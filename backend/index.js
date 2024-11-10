const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const routes = require('./routes/indexRoute');
const listeners = require('./services/listeners');
const port = 3000;
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);

const server = http.createServer(app);
const io = socketIO(server);

try {
    const connect = mongoose.connect('mongodb://localhost:27017/stock_xy');
    connect.then(() => console.log('Connected successfully')).catch((error) => console.log("An error occurred", error));
} catch (error) {
    console.log("An error occurred", error);
}

listeners.initializeSocket(io);

server.listen(port, () => {
    console.log(`The app is listening on: http://localhost:${port}`);
});
