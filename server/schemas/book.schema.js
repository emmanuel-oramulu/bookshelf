'use strict';
const { z } = require('zod');

const bookSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title cannot be empty')
    .max(200, 'Title is too long')
    .trim(),

  author: z.string().max(100, 'Author name is too long').trim().default(''),

  genre: z.string().max(50, 'Genre is too long').trim().default(''),

  status: z
    .enum(['want-to-read', 'reading', 'completed'])
    .default('want-to-read'),

  rating: z.number().int().min(1).max(5).nullable().default(null),

  notes: z.string().max(2000, 'Notes are too long').trim().default(''),

  coverUrl: z.string().url('Invalid URL').or(z.literal('')).default(''),

  dateStarted: z.string().datetime().nullable().default(null),

  dateCompleted: z.string().datetime().nullable().default(null),
});

const updateBookSchema = z.object({
  title: z.string().min(1).max(200).trim().optional(),
  author: z.string().max(100).trim().optional(),
  genre: z.string().max(50).trim().optional(),
  status: z.enum(['want-to-read', 'reading', 'completed']).optional(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  notes: z.string().max(2000).trim().optional(),
  coverUrl: z.string().url().or(z.literal('')).optional(),
  dateStarted: z.string().datetime().nullable().optional(),
  dateCompleted: z.string().datetime().nullable().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: 'At least one field is required to update' }
);

module.exports = { bookSchema, updateBookSchema };
