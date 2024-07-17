const mongoose = require('mongoose');

// eslint-disable-next-line import/no-extraneous-dependencies
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    totalAmount: {
      type: Number,
      required: [true, 'An invoice must have a total amount.'],
    },
    customerName: {
      type: String,
      required: [true, 'A customer must have a name.'],
    },
    invoiceNo: {
      type: Number,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

invoiceSchema.plugin(AutoIncrement, { inc_field: 'invoiceNo' });
invoiceSchema.pre('save', function (next) {
  if (!this.invoiceId) {
    this.invoiceId = this._id;
  }
  next();
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
