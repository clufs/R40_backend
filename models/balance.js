

const {Schema, model} = require('mongoose');

const balanceSchema = new Schema({
  period:      {type: String, required: true},
  totalIncome: {type: Number, required: true},
  totalProfit: {type: Number, required: true},
  totalOrders: {type: Number, required: true},
});


// esto sirva para poder agregar un propiedad de id a la coleccion
balanceSchema.set('toJSON', {
  virtuals: true
});


const Balance = model('Balance', balanceSchema);


module.exports = {Balance}
