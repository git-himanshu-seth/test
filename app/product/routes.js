const router = require('express').Router();
const { getProducts } = require('./controller');

router.route('/product').get(getProducts);

module.exports = router;
