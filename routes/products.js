
const { Router } = require('express');
const { createNewProduct, deleteProduct, updateProduct, getProduct, getAllProducts } = require('../controllers/product');


const router = Router();

router.post('/', createNewProduct);
router.get('/', getAllProducts)
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);


module.exports = router





