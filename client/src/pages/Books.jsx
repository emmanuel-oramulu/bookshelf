import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useNavigate
} from 'react-router';
import BookCard from '../components/BookCard';
import PageTransition from '../components/PageTransition.jsx';
import styles from './Books.module.css';

const FILTERS = ['All', 'Reading', 'Completed', 'Want to Read'];

const FILTER_LABELS = {
  'All': '✨ All',
  'Reading': '📖 Reading',
  'Completed': '✅ Completed',
  'Want to Read': '🔖 Want to Read',
};

const SORT_LABELS = [{
  key: '',
  label: 'Default'
}, {
  key: 'rating',
  label: '⭐ Rating'
}, {
  key: 'year',
  label: '📅 Year'
}, {
  key: 'title',
  label: '🔤 Title'
}]

function Books( {
  books
}) {
  const navigate = useNavigate();
  const [filter,
    setFilter] = useState('All');
  const [sortBy,
    setSortBy] = useState('');

  const filtered = [...books]
  .filter(book => filter === 'All' || book.status === filter)
  .sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "year":
        return b.year - a.year;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const showcaseBooks = [...books].reverse().slice(0, 3);

  return (
    <PageTransition>
      <div className={styles.bookPage}>
        <div className={styles.header}>
          <div className={styles.title}>
            My Books
          </div>
          <div
            className={styles.searchIcon}
            onClick={() => navigate('/search')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
          </div>
        </div>
        <div className={styles.showcase}>
          {showcaseBooks && (showcaseBooks.map(b => (
            <div
              key={b.id}
              className={styles.showcaseItem}
              >
              <div className={styles.pictureFrame}></div>
              <div className={styles.wrapper}>
                <div className={styles.avatar}>
                  📖
                </div>
                <div className={styles.details}>
                  <span className={styles.showcaseTitle}>{b.title}</span>
                  <span className={styles.showcaseDes}>{b.author}</span>
                </div>
              </div>
            </div>
          ))
          )
          }

        </div>
        <div className={styles.stickyHeader}>

          <div className={styles.filterBar}>
            {FILTERS.map(status => (
              <button
                key={status}
                className={`${styles.filterBtn} ${filter === status ? styles.filterBtnActive: ''}`}
                onClick={() => setFilter(status)}
                >
                {FILTER_LABELS[status]}
              </button>
            ))}
          </div>
          <div className={styles.sortBar}>
            <span className={styles.sortLabel}>Sort:</span>
            {SORT_LABELS.map(opt => (
              <button
                key={opt.key}
                className={`${styles.filterBtn} ${opt.key === sortBy ? styles.filterBtnActive: ''}`}

                onClick={() => setSortBy(opt.key)}>
                {opt.label}
                 </button>
            ))}
          </div>
        </div>

        <div className={styles.resultsInfo}>
          Showing {filtered.length} {filtered.length === 1 ? 'book': 'books'}
        </div>

        <div className={styles.bookList}>
          {filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyIcon}>
                🕵️‍♂️
              </p>
              <p className={styles.emptyTitle}>
                No matches found
              </p>
              <p className={styles.emptySubtitle}>
                Try adjusting your search or filters
              </p>
            </div>
          ): (
            filtered.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Books;