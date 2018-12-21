const express = require('express');
const database = require('./database');

const app = express();

database.initializeMongo();


app.get('/', function(req, res) {
   res.send('Hello world!');
})

app.listen(8080, function() {
    console.log(`Example add listening on port 8080`);

})
app.get('/api', function(req, res) {
    res.send("Hello");
})