const {Schema, model} = require('mongoose');


const ordersSchema = new Schema({

  Client: {type: String},
  date: { type: Number , default: Date.now() },
  status:{ type: String, default: 'pending' },
  dateFinish:{ type: Number },

  period:{type: String, required: true},


  orders: [
    {
      name:      { type: String },
      color:     { type: String },
      price:     { type: Number },
      profits:   { type: Number },
      quantity:  { type: Number },
      size:      { type: String },
      subTotal:  { type: Number },
      variant:   { type: String },
      _id:       { type: String }

      // status:    { type: String , default: 'Pending' },
    }
  ],
  
  TotalPrice:   { type: Number },
  TotalProfits: { type: Number },
  
  dept: {type: Number, default: 0}
  
});





const Order = model('Order', ordersSchema);

module.exports = {Order}











