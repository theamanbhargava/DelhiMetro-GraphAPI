var mongoose = require("mongoose");

var StaionSchema = new Mongoose.Schema({
    name: String,
    details: {
        line: [],
        layout: String,
        longitude: Number,
        latitude: Number
    }
});