const Modal = require('./productModal');
const factory = require('../../utils/handleFactory');

exports.getProducts = factory.getAll(Modal);
