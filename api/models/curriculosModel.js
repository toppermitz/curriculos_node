'use strict';
const mongoose = require('mongoose');
const z = require("zod");

const Schema = mongoose.Schema;
const curriculoSchema = new Schema({
   nome: {
      type: String,
      required: [true, 'Campo "nome" é obrigatório']
   },
   email: {
      type: String,
      validate: {
         validator: function(v) {
            return z.string().email().parse(v);
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
               Buffer.from(v, 'base64');
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
         values: ['delphi', 'mobile', 'nodejs', 'react']
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