const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_dovelopment');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting MongoDB"));

db.once('open', function(){
    console.log('Connected to DataBase :: MongoDB');
});


module.exports = db;