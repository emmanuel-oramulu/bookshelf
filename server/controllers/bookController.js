const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
  try {
    const filter = {
      user: req.userId,
    };

    const books = await Book.find(
      filter,
    ).sort({
      createdAt: -1,
    });

    return res.json(books, 'Books retrieved successfully');
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const book = await Book.create({
      ...req.body,
      user: req.userId,
    });

    return res.status(201).json(book, 'Book added successfully');
  } catch (error) {
    next(error);
  }
};


exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndUpdate({
      _id: req.params.id, user: req.userId
    }, req.body, {
      new: true, runValidators: true
    });

    if (!book) {
      const error = Object.assign(new Error('Book not found'), {
        status: 404
      });

      return next(error);
    }

    return res.json(book, 'Book updated successfully');
  } catch(error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!book) {
      const error = Object.assign(new Error('Book not found'), {
        status: 404
      });

      return next(error);
    }

    return res.json(null, 'Book deleted successfully');
  } catch (error) {
    next(error);
  }
};