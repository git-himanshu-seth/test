const Invoice = require('./invoiceModel');
const InvoideDetails = require('./invoiceDetailModal');
const factory = require('../../utils/handleFactory');

exports.createInvoice = factory.createOne(Invoice, InvoideDetails);
