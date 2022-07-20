// Dependencies 
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const User = require('./models/user');
// const TeeTime = require('./models/teetimes');

// TEST SERVER AND DATABASE VARIABLES ////////////////
const ronin = require('ronin-server');
const mocks = require('ronin-mocks');
const server = ronin.server()
const database = require('ronin-database')
// ///////////////////////////////////////////////

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


database.connect(process.env.CONNECTIONSTRING)

// TEST CODE FOR ATTACHING DEBUGGER /////////////
server.use( '/foo', (req, res) => {
    return res.json({ "foo": "bar" })
  })
////////////////////////////////////////////

// TEST SERVER ////////////
server.use('/', mocks.server(server.Router(), false, true))
server.start(() => {
    console.log("test server is running on 8000")
})

// ///////////////////////
// APPLICATION LISTENER /////////////////////////

// Listener 
const PORT = process.env.PORT

app.listen(PORT)
    
console.log(`Listening to Andre ${PORT}`)

/////////////////////////////////////////////////
module.export = app;