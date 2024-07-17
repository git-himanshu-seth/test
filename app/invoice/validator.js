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
        unit: joi.string().required(),
        quantity: joi.number().integer().min(1).required(),
        discount: joi.number().precision(2).required(),
        netAmount: joi.number().precision(2).required(),
        totalAmount: joi.number().precision(2).required(),
      }),
    )
    .min(1),
);
