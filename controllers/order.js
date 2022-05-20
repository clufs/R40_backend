const express = require('express');
const { Order } = require('../models/orders');


const createNewOrder = async (req, res = express.response) => {

  try {
    const order =  new Order(req.body);
    
    await order.save();

    res.json({
      ok: true,
      msg: 'La orden se creo con exito',
      order
    })
  } catch (error) {
    console.log(error)
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};

module.exports = { createNewOrder };