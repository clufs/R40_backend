const express = require("express");
// const { dbConecction } = require("./db/config");
require('dotenv').config();
const cors = require('cors');
const { DBconnect } = require("./db/config");

const app = express();

//base de datos
DBconnect();

app.use(cors())

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

// //? rutas de creacion grupoLugares/lugares/tipoDispositivos/dispositivos
app.use('/api/orders', require('./routes/orders'));
app.use('/api/products', require('./routes/products'));


// //?Ruta para el auth
app.use('/api/auth', require('./routes/auth'));


//escuchar 
app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});