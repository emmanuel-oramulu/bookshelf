const express = require('express');
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { bookSchema, updateBookSchema } = require('../schemas/book.schema');
const authValidator = require('../middleware/authValidator');
const validate = require('../middleware/validateBook');

router.use(authValidator);

router.get('/', getBooks);
router.post('/', validate(bookSchema), addBook);
router.put('/:id', validate(updateBookSchema), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
