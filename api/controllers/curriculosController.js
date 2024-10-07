'use strict';

const Curriculo = require('mongoose').model('Curriculo');
const z = require("zod");

const curriculoZodSchema = z.object({
   nome: z.string(),
   email: z.string().email(),
   telefone: z.string().regex(/\(\d{2}\)\d{4,5}-\d{4}/),
   linkedin: z.string(),
   pdfcurriculo: z.string(),
   vaga: z.enum(['delphi', 'mobile', 'nodejs', 'react']),
   ambiente: z.enum(['teste', 'producao']),
   zip: z.string().regex(/[^A-Za-z0-9+/=]/)
});

exports.send_curriculo = function(req, res) {
   const curriculo = curriculoZodSchema.parse(req.body);
   
   const new_curriculo = new Curriculo(curriculo);
   new_curriculo.save(function(err) {
      if (err) {
         res.status(400).json({ Retorno: err });
      }
   
      res.status(200).json({Retorno:'Seu currículo foi cadastrado com sucesso'});
   })  
}