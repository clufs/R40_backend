const express = require('express');
const { Product } = require('../models/products');


const createNewProduct = async (req, res = express.response) => {

  try {
    const newProduct =  new Product(req.body);
    
    await newProduct.save();

    res.json({
      ok: true,
      msg: 'El producto de agrego se creo con exito',
    })

  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};

const deleteProduct = async (req, res = express.response) => {
  const { id } = req.params;
  console.log(id)

  try {
    const productDelete = await Product.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: 'El producto se elimino con exito',
      productDelete
    })

  } catch (error) { 
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};

const updateProduct = async (req, res = express.response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const productUpdate = await Product.findByIdAndUpdate(id, body, { new: true });

    res.json({
      ok: true,
      msg: 'El producto se actualizo con exito',
      productUpdate
    })

  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};

const getProduct = async (req, res = express.response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if(product){
      res.json({
        ok: true,
        msg: 'El producto se encontro con exito',
        product
      })
    }else{
      res.json({
        ok: false,
        msg: 'El producto no existe',
      })
    }

  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};




module.exports = { createNewProduct, deleteProduct, updateProduct, getProduct };