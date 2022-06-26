const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const { format } = require("date-fns");

const teeTimeSchema = new Schema({

    date: { type: Date, required: true },
    time: { type: String, require: true },
    location: String,
},
    { timestamps: true }

);
const TeeTimes = mongoose.model('TeeTime', teeTimeSchema);


module.exports = TeeTimes; 