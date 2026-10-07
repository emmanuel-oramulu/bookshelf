const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.error(null, 'Access denied. No token provided.', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    });

    req.userId = decoded.userId;
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.error(null,
        'Token has expired. Please login again.',
        401
      );
    }

    return res.error(null,
      'Invalid token. Authentication failed.',
      403
    );
  }
};

module.exports = authenticateJWT;