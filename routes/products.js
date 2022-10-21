
const { Router } = require('express');
const { createNewProduct, deleteProduct, updateProduct, getProduct, getAllProducts, v2_getAllProducts } = require('../controllers/product');


const router = Router();

router.post('/', createNewProduct);

router.get('/', getAllProducts);
router.get('/v2-products', v2_getAllProducts);

router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.get('/:id', getProduct);


module.exports = router





