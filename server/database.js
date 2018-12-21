const mongoose = require('mongoose');

const DATABASE_PORT = process.env.DATABASE_PORT || 27017;
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_NAME = process.env.DATABASE_NAME || 'mydb';
const NODE_PORT = process.env.NODE_PORT || 8080;

const DATABASE_CONECTION = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;


var kittySchema = mongoose.Schema({
    name: String
});

Kitten = exports.Kitten = mongoose.model('Kitten', kittySchema);

exports.initializeMongo = function() {
    mongoose.connect(DATABASE_CONECTION);

    console.log('Try to connect to' + DATABASE_CONECTION);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: We minht not'))
    db.once('open', function() {
        console.log('We are connected you and I');
        addRandCat();
    })
}

var addRandCat = function() {
    var silence = new Kitten({
        name: 'Silence' + Math.random()
    });

    silence.save(function(err, fluffy) {
        if(err)
         return console.log(err);
         console.log('There is anew random cat in the neighborhood');
    })
}