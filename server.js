// Dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan')
const User = require('./models/user')
const TeeTime = require('./models/teetimes')




// connect to Mongodb
mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;



// Middleware 
app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json());








// Routes / Controllers 
const teeTimesController = require('./controllers/teetimes')
app.use(teeTimesController);

// Index

// New
// Delete
// Update
// Create

// Edit
// Show















// Connection logs 
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Listener 
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening to Andre ${PORT}`);
});