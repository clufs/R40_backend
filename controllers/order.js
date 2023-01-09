const express = require("express");
const { setDateFormat } = require("../helpers/dateFunc");
const { Order } = require("../models/orders");
const { Product } = require("../models/products");

const createOrderMobile = async (req, res = express.response) => {
  console.log(req.body.products);
  const products = await Product.find({});

  var totalPrice = 0;
  var totalProfit = 0;

  try {
    req.body.products.forEach(
      (e) => (totalPrice = totalPrice + e.price * e.cant)
    );

    req.body.products.forEach((prod) => {
      products.forEach((e) => {
        if (prod.name === e.name) {
          totalProfit = totalProfit + e.profits * prod.cant;
        }
      });
    });

    
  } catch (error) {
    console.log(error);
  }

  const order = {
    Client: "Venta en local",
    period: setDateFormat(Date.now()),
    status: "shiped",
    TotalPrice: totalPrice,
    TotalProfits: totalProfit,
    orders: req.body.products.map((e) => {
      return {
        name: e.name,
        color: "-",
        size: "-",
        price: e.price,
        quantity: e.cant,
        subTotal: e.price * e.cant,
        variant: "-",
        _id: e.id,
        statusOfStock: "-",
      };
    }),
  };

  try {
    const order1 = new Order(order);
    await order1.save();
    res.json({
      order1,
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewOrder = async (req, res = express.response) => {
  console.log(req.body);
  try {
    const order = new Order(req.body);

    await order.save();

    res.json({
      ok: true,
      msg: "La orden se creo con exito",
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const updateStatusOrderItem = async (req, res = express.response) => {
  const { _id, idOrderItem, status } = req.body;

  try {
    const order = await Order.findById(_id);

    const orderItem = order.Order.find((e) => e._id == idOrderItem);

    orderItem.status = status;

    await order.save();

    res.json({
      ok: true,
      msg: "El estado de la orden_item se actualizo con exito",
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const updateStatusOrder = async (req, res = express.response) => {
  const { _id, status } = req.body;

  try {
    const order = await Order.findById(_id);
    console.log(order);

    if (!order) {
      res.json({
        ok: false,
        msg: "La orden no existe",
      });
    } else {
      console.log("ingreso a el else");
      order.status = status;
    }

    await order.save();

    res.json({
      ok: true,
      msg: "El estado de la orden se actualizo con exito",
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const updateOrder = async (req, res = express.response) => {
  const { id, dept } = req.body;

  console.log(id, dept);

  try {
    const order = await Order.findById(id);

    if (!order) {
      res.json({
        ok: false,
        msg: "La orden no existe",
      });
    } else {
      order.dept = dept;

      await order.save();

      res.json({
        ok: true,
        msg: "La orden se actualizo con exito",
        order,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length > 0) {
      res.json({
        ok: true,
        msg: "Ordenes encontradas",
        orders,
      });
    } else {
      res.json({
        ok: false,
        msg: "No hay ordenes",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const deleteOrder = async (req, res) => {
  // console.log(req.body);
  try {
    const order = await Order.findByIdAndRemove(req.body._id);
    if (!order) {
      // console.log("algo salio mal", order);
      res.status(400).json({ ok: false });
    }

    res.status(200).json({ ok: true });
    // console.log("se elimino correctamente", order);
  } catch (error) {
    console.log(error);
  }
};

const getMonthValues = async (req, res) => {
  const period = _formatDay(new Date());
  let total = [];

  try {
    const ordersOfMoth = await Order.find({ period });
    const order = ordersOfMoth.map((order) => {
      if (order.dept === 0 && order.status === "shiped") {
        return order.orders;
      }
    });

    let profit_RemeraModal = 0;
    let profit_RemeraAlgodon = 0;

    let profit_gorras = 0;

    let profit_Patentes = 0;
    let profit_Calcos = 0;
    let profit_parches = 0;

    order.forEach((item) => {
      if (item != undefined) {
        item.map(({ profits, quantity, name }) => {
          //Modal
          if (name.includes("Modal")) {
            // console.log('si contiene Modal')
            profit_RemeraModal = profit_RemeraModal + profits * quantity;
          }

          //Algodon
          else if (name.includes("Algodón")) {
            profit_RemeraAlgodon = profit_RemeraAlgodon + profits * quantity;
          }

          //Gorras
          else if (name.includes("Gorra")) {
            profit_gorras = profit_gorras + profits * quantity;
          }

          //* Calcos
          else if (name.includes("Stickers")) {
            profit_Calcos = profit_Calcos + profits * quantity;
          }

          //* Patentes
          else if (name.includes("Patentes")) {
            profit_Patentes = profit_Patentes + profits * quantity;
          }

          //* Parches
          else if (name.includes("Parche")) {
            profit_parches = profit_parches + profits * quantity;
          }
        });
      }
    });

    res.json({
      period,

      profit_RemeraModal,
      profit_Patentes,
      profit_Calcos,
      profit_parches,
      profit_gorras,
      profit_RemeraAlgodon,

      total_profit:
        profit_RemeraModal +
        profit_Patentes +
        profit_Calcos +
        profit_parches +
        profit_gorras +
        profit_RemeraAlgodon,
    });
  } catch (error) {
    console.log(error);
  }

  // const orders = await Order.find({period: })
};

const _formatDay = (inputDate) => {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");

  month = month.toString().padStart(2, "0");

  return `${month}/${year}`;
};

module.exports = {
  createNewOrder,
  getAllOrders,
  updateStatusOrderItem,
  updateStatusOrder,
  updateOrder,
  createOrderMobile,
  deleteOrder,
  getMonthValues,
};
