const express = require("express");
const { Product } = require("../models/products");

const createNewProduct = async (req, res = express.response) => {
  console.log(req.body);

  try {
    const newProduct = new Product(req.body);

    await newProduct.save();

    res.json({
      ok: true,
      msg: "El producto de agrego se creo con exito",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const deleteProduct = async (req, res = express.response) => {
  const { id } = req.params;
  console.log(id);

  try {
    const productDelete = await Product.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "El producto se elimino con exito",
      productDelete,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Por favor hable con el adm",
    });
  }
};

const updateProduct = async (req, res = express.response) => {
  const { id } = req.params;
  const { price, profits, percentage, raw_material_price, dept } = req.body;

  console.log(price, profits, percentage, raw_material_price, dept);

  if (price !== undefined) {
    console.log("se Ingreso en la parte de UPDATE-PRODUCT-PRICE");
    try {
      const productUpdate = await Product.findByIdAndUpdate(
        id,
        { price, profits, percentage },
        { new: true }
      );

      res.json({
        ok: true,
        msg: "El producto se actualizo con exito",
        productUpdate,
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
        msg: "Por favor hable con el adm",
      });
    }
  }

  if (raw_material_price !== undefined) {
    console.log("se Ingreso en la parte de UPDATE-PRODUCT-RAW-MATERIAL-PRICE");
    console.log(raw_material_price, profits, percentage);

    try {
      const productUpdate = await Product.findByIdAndUpdate(
        id,
        { raw_material_price, profits, percentage },
        { new: true }
      );

      res.json({
        ok: true,
        msg: "El producto se actualizo con exito",
        productUpdate,
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
        msg: "Por favor hable con el adm",
      });
    }
  }
};

const getProduct = async (req, res = express.response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (product) {
      res.json({
        ok: true,
        msg: "El producto se encontro con exito",
        product,
      });
    } else {
      res.json({
        ok: false,
        msg: "El producto no existe",
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

const getAllProducts = async (req, res = express.response) => {
  try {
    const products = await Product.find();

    if (products.length > 0) {
      res.json({
        ok: true,
        msg: "Los productos se encontraron con exito, anasheee",
        products,
        productsArray: products.products,
      });
    } else {
      res.json({
        ok: false,
        msg: "No hay productos",
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

const v2_getAllProducts = async( req, res = express.response) => {
  try {
    const products = await Product.find();

    if( products.length > 0){
      const productsToSend = products.map( prod => {
        return {
          id: prod._id,
          name: prod.name,
          category: prod.category,
          price: prod.price,
        }
        
      });

      const a = productsToSend.filter(prod => prod.category === 'Otros' || prod.category === 'Gorra');

      res.json({
        products: a
      })

    }

  } catch (error) {
    console.log(error)
    res.json({
      ok:false,
      error,
    })
  }
}

module.exports = {
  createNewProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  v2_getAllProducts,
};
