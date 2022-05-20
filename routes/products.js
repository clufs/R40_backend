
const { Router } = require('express');
const { createNewProduct, deleteProduct, updateProduct, getProduct } = require('../controllers/product');


const router = Router();

router.post('/', createNewProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);


module.exports = router





