function errorHandler(err, req, res, next) {
  console.error(`💥 Error: ${err.message}`, err.stack);

  const message = err.message || 'Internal server error';
  const status = err.status || 500;
  return res.error(
    process.env.NODE_ENV === 'development' ? err.stack : null,
    message,
    status
  );
}

module.exports = errorHandler;
