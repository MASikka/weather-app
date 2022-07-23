const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String
    },
    date: {
        type: String
    },
    temperature: {
        type: String
    },
    wind: {
        type: String
    },
    humidity: {
        type: String
    }

});
mongoose.model('City', citySchema);