const mongoose = require('mongoose');

const invoiceDetailSchema = new mongoose.Schema(
  {
    invoicedetail_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InvoiceMaster',
      required: [true, 'InvoiceMaster id is required.'],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product id is required.'],
    },
    rate: {
      type: Number,
      required: [true, 'Rate is required.'],
    },
    unit: {
      type: String,
      required: [true, 'Unit is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
    },
    discountPercentage: {
      type: Number,
      required: [true, 'Discount is required.'],
    },
    netAmount: {
      type: Number,
      required: [true, 'Net amount is required.'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required.'],
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

invoiceDetailSchema.pre('save', function (next) {
  if (!this.invoicedetail_id) {
    this.invoicedetail_id = this._id;
  }
  next();
});

module.exports = mongoose.model('InvoiceDetail', invoiceDetailSchema);
