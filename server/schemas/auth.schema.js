const { z } = require('zod');

const registerSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .trim(),

  email: z
    .string({ required_error: 'Email is required' })
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),

  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters long')
    .regex(/(?=.*[0-9])/, 'Password must contain at least one number')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
    .regex(
      /(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/,
      'Password must contain at least one special character (e.g., !, @, #, $)'
    ),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),
  password: z.string({ required_error: 'Password is required' }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
