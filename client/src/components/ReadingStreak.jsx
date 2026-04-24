import {
  useState,
  useEffect
} from 'react';
import styles from './ReadingStreak.module.css';

const ReadingStreak = () => {
  const [streak,
    setStreak] = useState(0);
  const [toast,
    setToast] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastRead = localStorage.getItem('lastReadDate');
    const savedStreak = Number(localStorage.getItem('readingStreak')) || 0;

    if (lastRead === today) {
      setStreak(savedStreak);
      return;
    }

    if (lastRead) {
      const diffTime = Math.abs(new Date() - new Date(lastRead));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        const newStreak = savedStreak + 1;
        setStreak(newStreak);
        localStorage.setItem('readingStreak', newStreak);
        setToast(true);
        setTimeout(() => setToast(false), 3000);
      } else {
        setStreak(0);
        localStorage.setItem('readingStreak', 0);
      }
    }

    localStorage.setItem('lastReadDate', today);
  },
    []);

  const progress = Math.min((streak / 7) * 100,
    100);

  return (
    <div className={styles.streakWrapper}>

      {/* Toast */}
      {toast && (
        <div className={styles.toast}>
          🔥 Streak Maintained! You're on a {streak}-day roll!
        </div>
      )}

      {/* Header */}
      <div className={styles.streakHeader}>
        <div className={styles.streakTitle}>
          <span>🔥</span>
          <span>Daily Streak</span>
        </div>
        <div className={styles.streakCount}>
          <span>{streak} days</span>
        </div>
      </div>

      {/* Message */}
      <p className={styles.streakMessage}>
        {streak >= 7
        ? '🏆 Weekly goal achieved!': `Keep going! ${7 - streak} more day${7 - streak !== 1 ? 's': ''} to complete your week`
        }
      </p>

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={ { width: `${progress}%` }}
          />
      </div>

      {/* Day circles */}
      <div className={styles.circles}>
        {[1,
          2,
          3,
          4,
          5,
          6,
          7].map((day) => (
            <div
              key={day}
              className={`${styles.circle} ${day <= streak ? styles.active: ''}`}
              >
              {day}
            </div>
          ))}
      </div>

    </div>
  );
};

export default ReadingStreak;