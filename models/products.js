const {Schema, model} = require('mongoose');


const productsSchema = new Schema({
  name:               { type: String, required: true },
  category:           { type: String, required: true },
  subCatergory:       { type: String },

  price:              { type: Number, required: true },

  raw_material_price: { type: Number },
  profits:            { type: Number },
});

const Product = model('Product', productsSchema);

module.exports = {Product}

