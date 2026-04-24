import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import BookCard from '../components/BookCard';
import PageTransition from '../components/PageTransition.jsx';
import styles from './Search.module.css';

function Search ( {
  books
}) {
  const navigate = useNavigate();
  const [search,
    setSearch] = useState('');
  const searchInputRef = useRef(null);

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-focus search on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  },
    []);
  return (
    <PageTransition>
      <div className={styles.searchPage}>
        <header className={styles.header}>
          <div className={styles.navIcon} onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12H5" />/
              <path d="m12 19-7-7 7-7" />
            </svg>
          </div>
          <div className={styles.pageTitle}>
            Search
          </div>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author..."
            className={styles.searchInput}
            />
          {search && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => {
                setSearch('');
                searchInputRef.current.focus(); // Keep the keyboard open on mobile
              }}
              aria-label="Clear search"
              >
              {/* Modern Close Icon SVG */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}

        </div>
      </header>
      <div className={styles.resultsInfo}>
        {filtered.length !== 0 && (`Showing search ${filtered.length === 1 ? 'result': 'results'} for ${filtered.length} ${filtered.length === 1 ? 'book': 'books'}`)}
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

export default Search;