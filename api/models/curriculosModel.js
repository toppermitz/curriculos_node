'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var curriculoSchema = new Schema({
   nome: {
      type: String
   },
   email: {
      type: String
   },
   telefone: {
       type: String
   },
   linkedin: {
       type: String
   },
   pdfcurriculo : {
      type: String
   },
   vaga : {
      type: Number,
      enum: [0,1],
      default: 0
   },
   ambiente : {
      type: Number,
      enum:[0,1],
      default: 0
   },
   zip: {
      type: String
   }
});
module.exports = mongoose.model('Curriculo', curriculoSchema);