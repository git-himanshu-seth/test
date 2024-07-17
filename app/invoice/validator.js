const joi = require('joi');
const { validate, validateObjectId } = require('../../utils/validate');

exports.createValidator = validate(
  joi
    .array()
    .items(
      joi.object({
        customerName: joi.string().min(3).max(50).required(),
        product: joi.custom(validateObjectId).required(),
        rate: joi.number().min(0).required(),
        unit: joi.string().valid('single', 'multiple').required(),
        quantity: joi.number().integer().min(1).required(),
        discount: joi.number().min(0).max(100).default(0),
        netAmount: joi.number().precision(2).required(),
        totalAmount: joi.number().precision(2).required(),
      }),
    )
    .min(1),
);
