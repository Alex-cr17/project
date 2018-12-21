const express = require('express');
const database = require('./database');

const NODE_PORT = process.env.NODE_PORT || 8080;
const app = express();

database.initializeMongo();


app.get('/', function(req, res) {
   res.send('Hello world!');

})

app.listen(NODE_PORT, function() {
    console.log(`Example add listening on port ${NODE_PORT}`);

})
app.get('/api', function(req, res) {
    res.send("Hello");
    // database.Kitten.find(function(err, kittens) {
    //     if(err) return res.error(err);
    //     console.log(kittens);
    //     res.json(kittens);
    // })
})