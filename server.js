require('./api/models/curriculosModel');

const mongoose = require('mongoose');
const express = require('express');
const routes = require('./api/routes/curriculosRoute');


const app = express();
const port = process.env.PORT || 3000;


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/curriculodb', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(port);
console.log('Message RESTful API server started on: ' + port);