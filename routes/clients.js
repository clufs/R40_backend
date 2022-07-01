

const { Router } = require('express');
const { createNewClient, getAllClients } = require('../controllers/clients');



const router = Router();

router.post('/new', createNewClient);
router.get('/', getAllClients)

module.exports = router
