const mongoose = require('mongoose');

const {Schema, model} = mongoose;


//aca defino la forma de dato (como se veran todos los usuarios que creemeos en nuestra base de datos)
const UserSchema = Schema({  
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    unique: true
  },
  ownerId:{
    type: String,
    unique: true,
    default: Date.now().toString()
  }

})

//deffino el modelo
const UserModel = model('User', UserSchema);

module.exports = {UserModel};