import { Link } from 'react-router';
import styles from './BookCard.module.css';

// Maps canonical status to CSS class name
const STATUS_CLASS = {
  'Reading': styles.reading,
  'Completed': styles.completed,
  'Want to Read': styles.wanttoread,
};

function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.bookCard}>
        <div className={styles.avatar}>
          {book.title[0]}
        </div>
        <div className={styles.detail}>
          <p className={styles.bookTitle}>{book.title}</p>
          <p className={styles.bookAuthor}>{book.author}</p>
          {/*<p className={styles.bookMeta}>Genre • {book.genre}</p>
          <p className={styles.bookMeta}>Rating • {'⭐'.repeat(book.rating)}</p>
          <p className={styles.bookMeta}>Year • {book.year}</p>*/}
          <p className={`${styles.bookStatus} ${STATUS_CLASS[book.status] || ''}`}>
            {book.status}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;