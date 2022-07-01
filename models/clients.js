
const {Schema, model} = require('mongoose');



const clientSchema = new Schema({

  name:      {type: String, required: true},
  age:       {type: Number, required: true},
  phone1:    {type: Number, required: true},
  phone2:    {type: Number, required: true},
  place:     {type: String, required: true},
  location:  {type: String, required: true},
  orders: [
    {
      idOrden:{ type: String },
    }
  ],
  income:    { type: Number, default: 0 },
  profit:    { type: Number, default: 0 },
});



// esto sirva para poder agregar un propiedad de id a la coleccion 
clientSchema.set('toJSON', {
  virtuals: true
});



const Client = model('Client', clientSchema);

module.exports = {Client}





