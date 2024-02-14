'use strict';

const Curriculo = require('mongoose').model('Curriculo');

exports.send_curriculo = function(req, res) {
   const new_curriculo = new Curriculo(req.body);
   new_curriculo.save(function(err) {
   if (err)
      res.status(500).json({ Retorno: err });
   else 
      res.status(200).json({Retorno:'Seu currículo foi cadastrado com sucesso'});
   })  
}