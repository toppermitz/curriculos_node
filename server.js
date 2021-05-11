var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose')


mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/curriculodb', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var model = require('./api/models/curriculosModel');
var routes = require('./api/routes/curriculosRoute');
routes(app);

app.get('/', function (req, res) {
    res.status(200).send('Hello!');
});
  

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(port);
console.log('Message RESTful API server started on: ' + port);