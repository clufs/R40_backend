const {Schema, model} = require('mongoose');


const productsSchema = new Schema({

  name:               { type: String, required: true },
  category:           { type: String, required: true },
  subCategory:        { type: String },
  slug:               { type: String },

  sizes:              [ { type: String } ],
  variants:           [ { type: String } ],
  colors:             [ { type: String } ],


  raw_material_price: { type: Number, required: true },
  price:              { type: Number, required: true },
  percentage:         { type: Number },
  profits:            { type: Number },

  temp:               { type: String },
  time:               { type: String },
  presion:            { type: String },

});

productsSchema.set('toJSON', {
  virtuals: true
});

const Product = model('Product', productsSchema);

module.exports = {Product}

