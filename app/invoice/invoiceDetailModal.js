const mongoose = require('mongoose');

const invoiceDetailsSchema = new mongoose.Schema(
  {
    invoicedetailId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
      required: [true, 'Invoice id is required.'],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Invoice',
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
    qty: {
      type: Number,
      required: [true, 'Quantity is required.'],
    },
    disc: {
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
invoiceDetailsSchema.pre('save', function (next) {
  if (!this.invoicedetail_id) {
    this.invoicedetail_id = this._id;
  }
  next();
});
const InvoiceDetails = mongoose.model('invoiceDetails', invoiceDetailsSchema);

module.exports = InvoiceDetails;
