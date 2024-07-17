const Product = require('./modal');
const catchAsync = require('../../utils/catchAsync');

exports.getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  res
    .status(200)
    .json({ status: 'success', results: products.length, data: products });
});
