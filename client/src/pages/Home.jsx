import {
  useState,
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router';
import BookCard from '../components/BookCard';
import PageTransition from '../components/PageTransition';
import StreakBadge from '../components/StreakBadge';
import {
  calculateStreak
} from '../utils/calculateStreak.js';
import styles from './Home.module.css';

const QUOTES = [
  "A room without books is like a body without a soul.",
  "I have always imagined that Paradise will be a kind of library.",
  "Read the best books first, or you may not have a chance to read them at all.",
  "Books are a uniquely portable magic.",
  "The more that you read, the more things you will know."
];

function Home( {
  books
}) {
  const navigate = useNavigate();
  const [quote,
    setQuote] = useState('');
  const userName = localStorage.getItem('profile_name') || 'Reader';

  const maxBooks = books.sort((a, b) => b.currentPage - a.currentPage).slice(0, 3)

  function progressCalc(book) {
    const progress = book.totalPages > 0 ? (book.currentPage / book.totalPages): 0;
    const percentage = Math.min(Math.max(progress * 100, 0), 100).toFixed(1);
    return percentage;
  }

  // 1. Logic: Stats & Filtered Lists
  const hours = new Date().getHours();
  const getGreeting = () => {
    if (hours < 12) return `Good Morning, ${userName} ☕`;
    if (hours < 18) return `Good Afternoon, ${userName} 📖`;
    return `Good Evening, ${userName} 🌙`;
  };

  const completed = books.filter(b => b.status === 'Completed').length;
  const readingBooks = books.filter(b => b.status === 'Reading');
  const wantToRead = books.filter(b => b.status === 'Want to Read').length;
  const recentBooks = [...books].reverse().slice(0, 3);

  useEffect(() => {
    setQuote(QUOTES[new Date().getDate() % QUOTES.length]);
  }, []);

  return (
    <PageTransition>
      <div className={styles.homeContainer}>

        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.greetingRow}>
            <div className={styles.headerText}>
              <h1 className={styles.greeting}>{getGreeting()}</h1>
              <p className={styles.subtitle}>
                Welcome back to your curated shelf.
              </p>
              <StreakBadge count={calculateStreak()} />
            </div>
            <div className={styles.iconWrapper}>
              <div className={styles.notificationBell} onClick={() => navigate('/notifications')}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f5e6d3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span className={styles.pulseBadge}></span>
              </div>
              <div className={styles.notificationBell} onClick={() => navigate('/settings')}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#f5e6d3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"><path d="m388-80-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 77q2 10 2.5 21.5t.5 21.5q0 10-.5 21t-2.5 21l108 78-93 164-118-54q-16 13-36.5 25.5T592-206L572-80H388Zm48-60h88l14-112q33-8 62.5-25t53.5-41l106 46 40-72-94-69q4-17 6.5-33.5T715-480q0-17-2-33.5t-7-33.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q24 24 53.5 41t62.5 25l14 112Zm44-210q54 0 92-38t38-92q0-54-38-92t-92-38q-54 0-92 38t-38 92q0 54 38 92t92 38Zm0-130Z" /></svg>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.searchBar} onClick={() => navigate('/search')}>
          <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></span>
          <span className={styles.placeholder}>Search...</span>
        </div>
        {/* Stats Bento Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCardMain} onClick={() => navigate('/books')}>
            <span className={styles.statIcon}>📚</span>
            <div className={styles.statInfo}>
              <span className={styles.statNumber}>{books.length}</span>
              <span className={styles.statLabel}>Total Library</span>
            </div>
          </div>
          <div className={styles.statCardSmall}>
            <span className={styles.statNumberSmall}>{completed}</span>
            <span className={styles.statLabelSmall}>Finished</span>
          </div>
          <div className={styles.statCardSmall}>
            <span className={styles.statNumberSmall}>{wantToRead}</span>
            <span className={styles.statLabelSmall}>Wishlist</span>
          </div>
        </div>

        {/* Reading Progress Tracker */}
        {readingBooks.map(book => (
          <div key={book.id} className={styles.progressCard} onClick={() => navigate(`/books/${book.id}`)}>
            <div className={styles.progressMeta}>
              <span className={styles.progressTitle}>{book.title}</span>
              {/* Use the actual percentage here */}
              <span className={styles.progressValue}>{progressCalc(book)}%</span>
            </div>
            {/* Remove the maxBooks.map loop and call progressCalc directly */}
            <progress className={styles.progressBar} value={progressCalc(book)} max={100} />
          </div>
        ))}

        {/* Recently Added */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recently Added</h2>
            <button className={styles.textBtn} onClick={() => navigate('/books')}>View All →</button>
          </div>
          <div className={styles.recentList}>
            {recentBooks.length > 0 ? (
              recentBooks.map(book => <BookCard key={book.id} book={book} />)
            ): (
              <div className={styles.emptyCard} onClick={() => navigate('/add')}>
                ➕ Add your first book
              </div>
            )}
          </div>
        </section>

        {/* Inspirational Quote */}
        <footer className={styles.quoteArea}>
          <p className={styles.quoteText}>
            “{quote}”
          </p>
          <div className={styles.quoteLine}></div>
        </footer>

      </div>
    </PageTransition>
  );
}

export default Home;