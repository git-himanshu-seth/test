const router = require('express').Router();
const validators = require('./validator');
const { createInvoice } = require('./controller');

router.route('/invoice').post(validators.createValidator, createInvoice);

module.exports = router;
