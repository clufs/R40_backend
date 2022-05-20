

const { Router } = require('express');

const { createNewOrder } = require('../controllers/order');


const router = Router();

router.post('/new', createNewOrder);



module.exports = router
