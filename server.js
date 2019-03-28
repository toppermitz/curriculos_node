var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/curriculodb', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
var model = require('./api/models/curriculosModel');
var routes = require('./api/routes/curriculosRoute');
routes(app);

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});
  

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(port);
console.log('Message RESTful API server started on: ' + port);