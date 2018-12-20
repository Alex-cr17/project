const express = require('express');
const database = require('./database');

console.log(database);
const app = express();

database.initializeMongo();


app.get('/', function(req, res) {
   res.send('Hello world!');

})

app.listen(8080, function() {
    console.log('Example add listening on port 3000');

})
app.get('/textFind', function(req, res) {
    database.Kitten.find(function(err, kittens) {
        if(err) return res.error(err);
        console.log(kittens);
        res.json(kittens);
    })
})