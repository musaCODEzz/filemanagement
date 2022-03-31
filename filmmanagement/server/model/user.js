const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    username : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
});

const Login = mongoose.model('logindb', schema);
module.exports = Login;