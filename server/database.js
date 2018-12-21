const mongoose = require('mongoose');

const DATABASE_CONECTION = `mongodb://database:27017/db`;

exports.initializeMongo = function() {
    mongoose.connect(DATABASE_CONECTION);

    console.log('Try to connect to' + DATABASE_CONECTION);

    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: We minht not'))
}
