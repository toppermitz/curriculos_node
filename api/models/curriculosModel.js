'use strict';
var 
mongoose = require('mongoose'),
b2a = require('b2a'),
validator = require("email-validator");
 



var Schema = mongoose.Schema;

var curriculoSchema = new Schema({
   nome: {
      type: String,
      required: [true, 'Campo "nome" é obrigatório']
   },
   email: {
      type: String,
      validate: {
         validator: function(v) {
            return validator.validate(v);
         },
         message: props => `${props.value} não parece ser um email válido!`
      },
      required: [true, 'Campo "email" é obrigatório']
   },
   telefone: {
      type: String,
      validate: {
         validator: function(v) {
            return /\(\d{2}\)\d{4,5}-\d{4}/.test(v);
         },
         message: props => `${props.value} não parece ser um número válido! Utilize o formato (99)99999-9999`
      },
      required: [true, 'Campo "telefone" é obrigatório']      
   },
   linkedin: {
       type: String,
       required: [true, 'Campo "linkedin" é obrigatório']
   },
   pdfcurriculo : {
      type: String,
      validate: {
         validator: function(v) {
            try {
            var teste = b2a.atob(v)
            } catch(e) {
             return false;
            }
            return true;
         },
         message: props => `${props.value} não parece ser um base64 válido!`
      },
      required: [true, 'Campo "pdfcurriculo" é obrigatório']
   },
   vaga : {
      type: String,
      enum: /*[0,1],*/
      {
         values: ['delphi', 'mobile']
       , message: 'Campo "vaga" é obrigatório'
       },
      default: 'delphi'
   },
   ambiente : {
      type: String,
      enum: /*[0,1],*/
      {
         values: ['teste', 'producao']
       , message: 'Campo "ambiente" é obrigatório'
       },
      default: 'teste'
   },
   zip: {
      type: String,
      validate: {
         validator: function(v) {
            try {
               b2a.btoa(v);
            } catch(e) {
              return false;
            }
            return true;
         },
         message: props => `${props.value} não parece ser um base64 válido!`
      },
      required: [true, 'Campo "zip" é obrigatório']
   }
});
module.exports = mongoose.model('Curriculo', curriculoSchema);