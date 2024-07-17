const Product = require('../app/product/modal');

const products = [
  { productName: 'Product 1', rate: 100, unit: 'single' },
  { productName: 'Product 2', rate: 150, unit: 'pair' },
  { productName: 'Product 3', rate: 200, unit: 'single' },
  { productName: 'Product 4', rate: 250, unit: 'pair' },
  { productName: 'Product 5', rate: 300, unit: 'single' },
];

const seedProducts = async () => {
  try {
    const existingProducts = await Product.countDocuments();

    if (existingProducts !== 0) {
      return;
    }

    const queries = products.map((product) => Product.create(product));
    await Promise.all(queries);
  } catch (error) {
    console.error('Failed to initialize products');
  }
};

module.exports = seedProducts;
