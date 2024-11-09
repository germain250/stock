const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes/indexRoute')
const port = 3000;
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use('/',routes)


try {
    const connect = mongoose.connect('mongodb://localhost:27017/stock_xy')
    if(connect){
        console.log('Connected succesfully')
    }
} catch (error) {
    console.log("An error occured", error)    
}

app.listen(port, ()=>{
    console.log(`the app is listening on: http://localhost:${port}`)
})