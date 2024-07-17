const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productID: {
      type: String,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
productSchema.pre('save', function (next) {
  if (!this.productID) {
    this.productID = this._id;
  }
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
