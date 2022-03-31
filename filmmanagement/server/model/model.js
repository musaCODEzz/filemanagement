const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    yearOfRelease : {
        type: String,
        required: true,
       
    },
    genre : String,
    status : String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;