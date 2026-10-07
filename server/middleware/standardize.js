const standardize = (options = {}) => {
  console.log('Standardize middleware applied');
  const { defaultMessage = 'Success' } = options;

  return (req, res, next) => {
    if (res._standardized) return next();
    res._standardized = true;

    const originalJson = res.json;

    res.json = function (data, message = defaultMessage, success = true) {
      const responsePayload = {
        success,
        message,
        data: data || null,
      };
      return originalJson.call(this, responsePayload);
    };
    
    res.error = function (error, message = 'Error occurred', status = 500) {
      const errorPayload = {
        success: false,
        message,
        error: error || null,
      };

      res.status(status);
      return originalJson.call(this, errorPayload);
    };

    next();
  };
};

module.exports = standardize;
