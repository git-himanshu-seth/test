const InvoiceMaster = require('./modal/invoiceMaster');
const InvoiceDetail = require('./modal/invoiceDetail');
const catchAsync = require('../../utils/catchAsync');

exports.createInvoice = catchAsync(async (req, res) => {
  const data = req.body;

  const invoice = await InvoiceMaster.create({
    customerName: data[0].customerName,
    totalAmount: data.reduce((sum, item) => {
      sum += item.totalAmount;
      return sum;
    }, 0),
  });

  const queries = data.map((item) =>
    InvoiceDetail.create({
      invoice_id: invoice.invoice_id,
      product_id: item.product,
      rate: item.rate,
      unit: item.unit,
      quantity: item.quantity,
      discountPercentage: item.discount,
      netAmount: item.netAmount,
      totalAmount: item.totalAmount,
    }),
  );

  await Promise.all(queries);
  res.status(201).json({ status: 'success' });
});
