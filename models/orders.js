const {Schema, model} = require('mongoose');


const ordersSchema = new Schema({

  date: { type: Number , default: Date.now() },
  status:{ type: String, default: 'pending'},
  dateFinish:{ type: Number },
  orderItems: [
    {
      _id:       { type: String },
      name:      { type: String },
      size:      { type: Number },
      quantity:  { type: Number },
      price:     { type: Number },
    }
  ],
  cantItems:    { type: Number },
  totalPrice:   { type: Number },
  totalProfits: { type: Number }

});



const Order = model('Order', ordersSchema);

module.exports = {Order}











