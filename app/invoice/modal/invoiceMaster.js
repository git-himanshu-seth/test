const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoiceMasterSchema = new mongoose.Schema(
  {
    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    invoice_no: {
      type: Number,
    },
    customerName: {
      type: String,
      required: [true, 'A customer must have a name.'],
    },
    totalAmount: {
      type: Number,
      required: [true, 'An invoice must have a total amount.'],
    },
    invoice_date: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

invoiceMasterSchema.plugin(AutoIncrement, { inc_field: 'invoiceNo' });

invoiceMasterSchema.pre('save', function (next) {
  if (!this.invoice_id) {
    this.invoice_id = this._id;
  }
  next();
});

const InvoiceMaster = mongoose.model('InvoiceMaster', invoiceMasterSchema);
module.exports = InvoiceMaster;
