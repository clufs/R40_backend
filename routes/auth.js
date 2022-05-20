// rutas de  usuario / Auth
//    host+/api/auth

const express = require('express');
const router = express.Router()

const {
  crearUsuario,
  loginUsuario,
  revalidarUsuario
} = require('../controllers/auth');
const {
  validarJWT
} = require('../middlewares/validar-jwt');

// ! (3) Rutas (configuracion)

router.post('/new', crearUsuario);

router.post('/', loginUsuario);

router.get('/renew', validarJWT, revalidarUsuario);


//asi se exporta con nodejs 
module.exports = router;