'use strict';
var mongoose = require('mongoose'),
Curriculo = mongoose.model('Curriculo');

exports.send_curriculo = function(req, res) {
   var new_curriculo = new Curriculo(req.body);
   new_curriculo.save(function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};