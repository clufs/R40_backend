const express = require('express');
const {
  Order
} = require('../models/orders');


const createNewOrder = async (req, res = express.response) => {

  console.log(req.body)
  try {
    const order = new Order(req.body);


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

const updateStatusOrderItem = async (req, res = express.response) => {

  const {
    _id,
    idOrderItem,
    status
  } = req.body;



  try {
    const order = await Order.findById(_id);

    const orderItem = order.Order.find(e => e._id == idOrderItem)

    orderItem.status = status;

    await order.save();

    res.json({
      ok: true,
      msg: 'El estado de la orden_item se actualizo con exito',
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

const updateStatusOrder = async (req, res = express.response) => {

  const {
    _id,
    status
  } = req.body;


  try {

    const order = await Order.findById(_id);
    console.log(order)

    if (!order) {
      res.json({
        ok: false,
        msg: 'La orden no existe',
      })
    } else {
      console.log('ingreso a el else')
      order.status = status;
    }

    await order.save();

    res.json({
      ok: true,
      msg: 'El estado de la orden se actualizo con exito',
      order
    })


  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }
};




const updateOrder = async (req, res = express.response) => {

  const {
    id,
    dept
  } = req.body

  console.log(id, dept)

  try {
    const order = await Order.findById(id);

    if (!order) {
      res.json({
        ok: false,
        msg: 'La orden no existe',
      })
    } else {
      order.dept = dept;

      await order.save();

      res.json({
        ok: true,
        msg: 'La orden se actualizo con exito',
        order
      })
    }


  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }

}





const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find();

    if (orders.length > 0) {
      res.json({
        ok: true,
        msg: 'Ordenes encontradas',
        orders
      })
    } else {
      res.json({
        ok: false,
        msg: 'No hay ordenes',
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: 'Por favor hable con el adm',
    })
  }



}

module.exports = {
  createNewOrder,
  getAllOrders,
  updateStatusOrderItem,
  updateStatusOrder,
  updateOrder
};