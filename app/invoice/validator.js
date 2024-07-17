const joi = require('joi');
const { validate } = require('../../utils/validate');

const invoiceItemSchemaJoi = joi.object({
  productId: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  rate: joi.number().required(),
  unit: joi.string().required(),
  qty: joi.number().required(),
  disc: joi.number().optional(),
  netAmount: joi.number().required(),
  totalAmount: joi.number().required(),
});
exports.createValidator = validate(
  joi.object({
    customerName: joi.string().trim().required(),
    totalAmount: joi.number().required(),
    products: joi.array().items(invoiceItemSchemaJoi).required(),
  }),
);
