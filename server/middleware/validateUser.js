'use strict';

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const validationErrors = result.error.flatten().fieldErrors;

    return res.error(validationErrors, 'Validation failed', 400);
  }

  req.body = result.data;
  next();
};

module.exports = validate;
