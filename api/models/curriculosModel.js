'use strict';
var mongoose = require('mongoose');
var swaggerMongoose = require('swagger-mongoose');
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
   }

});
module.exports = mongoose.model('Curriculo', curriculoSchema);