

const { Router } = require('express');

const { createNewOrder, getAllOrders, updateStatusOrder, updateOrder, updateStatusOrderItem } = require('../controllers/order');


const router = Router();

// /api/orders/new
router.post('/new', createNewOrder);

router.post('/update-status-order_item', updateStatusOrderItem )

router.post('/update-status-order', updateStatusOrder )

router.post('/update-dept-order', updateOrder)

router.get('/', getAllOrders)





module.exports = router
