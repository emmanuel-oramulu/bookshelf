'use strict';
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      trim: true,
      default: '',
    },
    genre: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['want-to-read', 'reading', 'completed'],
      default: 'want-to-read',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    coverUrl: {
      type: String,
      default: '',
    },
    dateStarted: {
      type: Date,
      default: null,
    },
    dateCompleted: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
