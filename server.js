/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productModal = require('./app/product/productModal');

process.on('uncaughtException', (err) => {
  console.error('Unhandle Exception! Shutting Down');
  console.error(err);
  process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = require('./app');

async function createInitialProducts() {
  const products = [
    { productName: 'Product 1', rate: 100, unit: 'single' },
    { productName: 'Product 2', rate: 150, unit: 'pair' },
    { productName: 'Product 3', rate: 200, unit: 'single' },
    { productName: 'Product 4', rate: 250, unit: 'pair' },
    { productName: 'Product 5', rate: 300, unit: 'single' },
  ];
  for (const product of products) {
    // eslint-disable-next-line no-await-in-loop
    const existingProduct = await productModal.findOne({
      productName: product.productName,
    });
    if (!existingProduct) {
      // eslint-disable-next-line no-await-in-loop
      await productModal.create(product);
    }
  }
}
const init = async () => {
  await mongoose.connect(process.env.DB_URI);

  const server = app.listen(process.env.SERVER_PORT, () =>
    console.error(`Server running on port ${process.env.SERVER_PORT}`),
  );
  createInitialProducts();
  process.on('unhandledRejection', (err) => {
    console.error('Unhandle Rejection! Shutting Down');
    console.error(err);
    server.close(() => {
      process.exit(1);
    });
  });
};

init();
