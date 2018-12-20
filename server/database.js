const mongoose = require('mongoose');

const DATABASE_CONECTION = 'mongodb://mongo:27017/test';

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