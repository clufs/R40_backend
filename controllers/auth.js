const express = require('express');
const bcrypt = require('bcryptjs'); //importamos la libreria de encryptacion

const {
  validationResult //esta es la forma de ver el resultado de la valuidacion que hacemos en la parte de auth(routes)
} = require('express-validator');

const {
  UserModel // inport el modelo que creeamos en [Model]User
} = require('../models/user');
const { generarJWT } = require('../helpers/jsonwebtoken');

const crearUsuario = async (req, res = express.response) => {

  const {
    email,
    password,
  
  } = req.body

  try {

    //? Busqueda de un dato
    let usuario = await UserModel.findOne({
      email: email
    }); //en esta linea busco mediante el metodo 'findOne' del modelo 'UserModel' a algo con las caracateristicas que encierro entre llaves{}
    //usuario devolvera un objeto si esque encuentra algo o retornara 'null' en casocontrario

    if (usuario) { //aca veo si el usuario existe o no mediante
      return res.status(400).json({
        ok: false,
        msg: 'un usuario existe con ese correo',
      });
    }

    //? definimos como sera el elemento que vamos a guardar
    usuario = new UserModel(req.body); //aca lo volvemos a definir. Anteriormente lo habiamos usado como una forma de validar ahora lo usaremos como una forma de crear un objeto en base de datos


    //? encryptacion de la clave
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    //? Guardado de un elemento en MongoDB por Mongoose
    await usuario.save()

    //? Genera JSONWebTocken
    const token = await generarJWT(usuario.id, usuario.name);

    //? respuesta que mandamos al usuario 
    res.status(201).json({
      ok: true,
      msg: 'registro',
      uid: usuario.id,
      name: usuario.name,
      token,
    })

    //? si algo sale mal se manda esto al usuario
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el adm'
    })
  }

};

const loginUsuario = async(req, res = express.response) => {
  const {
    email,
    password
  } = req.body

  try {
    //? Busqueda de un dato (email)
    let usuario = await UserModel.findOne({
      email: email
    }); //en esta linea busco mediante el metodo 'findOne' del modelo 'UserModel' a algo con las caracateristicas que encierro entre llaves{}
    //usuario devolvera un objeto con todas las caracteristicas del objeto que matcheo (name, password, y loq ue se configuro anteriormente)
    //si esque encuentra algo o retornara 'null' en casocontrario. Hacer un console.log(usuario) para ver que retorna

    if (!usuario) { //aca veo si el usuario existe o no mediante
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con este email',
      });
    }

    //? Confirmamos las passwords

    let validPassword = bcrypt.compareSync(password, usuario.password); //retorna un boolean se compara las encriptada y el no encriptada

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contrasena incorrecta'
      })
    }


    //? si la contrasena y el email son correctos
    //? Generar JSON web TOCKEN

    const token = await generarJWT(usuario.id, usuario.name);

    
    res.json({
      ok: true,
      msg: 'login',
      uid: usuario.id,
      name: usuario.name,
      token
    })
    console.log('se ingreso con exito')
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el adm'
    })
  }


};

const revalidarUsuario = async (req, res = express.response) => {
  
  const uid = req.uid;
  const name = req.name;

  const token = await generarJWT(uid, name)

  res.json({
    ok: true,
    token,
    uid,
    name
  })
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarUsuario
};