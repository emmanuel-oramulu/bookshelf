'use strict';
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { registerSchema, loginSchema } = require('../schemas/auth.schema');
const { register, login } = require('../controllers/authController');
const validate = require('../middleware/validateUser');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs

  // Use a custom handler to completely bypass standard formatting
  handler: (req, res, next) => {
    // We call res.error directly since it bypasses success wrapping!
    // Signature: res.error(errorDetail, message, statusCode)
    return res.error(
      'RateLimitExceeded',
      'Too many login attempts, try again later',
      429
    );
  },
});

router.post('/register', validate(registerSchema), register);
router.post('/login', loginLimiter, validate(loginSchema), login);

module.exports = router;
