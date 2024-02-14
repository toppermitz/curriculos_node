'use strict';
module.exports = function(app) {
    const curriculos = require('../controllers/curriculosController');

    app.route('/curriculo/enviar').post(curriculos.send_curriculo);
};
