

const { Router } = require('express');

const { deleteOrder,createNewOrder, getAllOrders, updateStatusOrder, updateOrder, updateStatusOrderItem } = require('../controllers/order');


const router = Router();

// /api/orders/new
router.post('/new', createNewOrder);

router.post('/update-status-order_item', updateStatusOrderItem );

router.post('/update-status-order', updateStatusOrder );

router.post('/update-dept-order', updateOrder);

router.get('/', getAllOrders);

router.post('/remove', deleteOrder);





module.exports = router
