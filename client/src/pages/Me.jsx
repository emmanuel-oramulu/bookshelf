import {
  useState,
  useEffect
} from 'react';
import PageTransition from '../components/PageTransition';
import ReadingStreak from '../components/ReadingStreak';
import Dashboard from '../components/Dashboard';
import styles from './Me.module.css';

function Me( {
  books
}) {
  // Initialize from localStorage
  const [name,
    setName] = useState(() => localStorage.getItem('profile_name') || 'Reader');
  const [bio,
    setBio] = useState('Building my reading habit one book at a time 📖');
  const [editing,
    setEditing] = useState(false);

  // Update localStorage when name changes
  useEffect(() => {
    localStorage.setItem('profile_name', name);
  }, [name]);



  const completed = books.filter(b => b.status === 'Completed').length;
  const reading = books.filter(b => b.status === 'Reading').length;
  const wantToRead = books.filter(b => b.status === 'Want to Read').length;

  const genreCount = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});
  const favGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None yet';


  const averageRating = books.length > 0 ? +(books.reduce((acc, b) => acc + b.rating, 0) / books.length).toFixed(1): '—';

  /* useEffect(() => {
  if (mePageRef.current) {
    mePageRef.current.scrollTo({ top: 0, behavior: 'instant' });
  }
}, []); */



  return (
    <PageTransition>
      <div className={styles.mePage}>

        {/* Profile */}
        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <h2>{name[0]}</h2>
          </div>
          {editing ? (
            <div className={styles.editForm}>
              <input
              className={styles.editInput}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              />
            <input
            className={styles.editInput}
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Your bio"
            />
          <button className={styles.saveBtn} onClick={() => setEditing(false)}>Save</button>
        </div>
      ): (
        <>
          <h2 className={styles.profileName}>{name}</h2>
          <p className={styles.profileBio}>
            {bio}
          </p>
          <button className={styles.editBtn} onClick={() => setEditing(true)}>✏️ Edit Profile</button>
        </>
      )}
    </div>

    {/* Stats */}
    <div className={styles.section}>
      <p className={styles.sectionLabel}>
        Reading Stats
      </p>
      <div className={styles.statsGrid}>
        {[{
          label: 'Total',
          value: books.length,
          icon: '📚'
        },
          {
            label: 'Reading',
            value: reading,
            icon: '📖'
          },
          {
            label: 'Completed',
            value: completed,
            icon: '✅'
          },
          {
            label: 'Want to Read',
            value: wantToRead,
            icon: '🔖'
          },
        ].map(stat => (
            <div key={stat.label} className={styles.statCard}>
              <p className={styles.statIcon}>
                {stat.icon}
              </p>
              <p className={styles.statValue}>
                {stat.value}
              </p>
              <p className={styles.statLabel}>
                {stat.label}
              </p>
            </div>
          ))}
      </div>
    </div>

    {/* Charts */}
    <div className={styles.section}>
      <p className={styles.sectionLabel}>
        Reading Charts
      </p>
      <Dashboard books={books} />
    </div>

    {/* Streak */}
    <div className={styles.section}>
      <p className={styles.sectionLabel}>
        Daily Streak
      </p>
      <ReadingStreak />
    </div>

    {/* Favourite Genre */}
    <div className={styles.section}>
      <p className={styles.sectionLabel}>
        Insights
      </p>
      <div className={styles.insightRow}>
        <div className={styles.insightCard}>
          <p className={styles.insightIcon}>
            🎭
          </p>
          <p className={styles.insightLabel}>
            Fav Genre
          </p>
          <p className={styles.insightValue}>
            {favGenre}
          </p>
        </div>
        <div className={styles.insightCard}>
          <p className={styles.insightIcon}>
            ⭐
          </p>
          <p className={styles.insightLabel}>
            Avg Rating
          </p>
          <p className={styles.insightValue}>
            {averageRating}
          </p>
        </div>
      </div>
    </div>

    {/* About */}
    <div className={styles.section}>
      <p className={styles.sectionLabel}>
        About
      </p>
      <div className={styles.aboutCard}>
        <p className={styles.aboutTitle}>
          📚 BookShelf
        </p>
        <p className={styles.aboutText}>
          Your personal reading companion. Track books, build habits, grow your library.
        </p>
        <p className={styles.aboutVersion}>
          Version 1.0.0
        </p>
      </div>
    </div>

  </div>
</PageTransition>
);
}

export default Me;