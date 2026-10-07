import styles from './StreakBadge.module.css';

const StreakBadge = ({
  count
}) => {
  if (count === 0) return null;

  return (
    <div className={`${styles.streakWrapper} ${count > 0 ? styles.onFire: ''}`}>
      <span className={styles.flameIcon}>🔥</span>
      <div className={styles.textStack}>
        <span className={styles.count}>{count}</span>
        <span className={styles.label}>DAY STREAK</span>
      </div>
    </div>
  );
};

export default StreakBadge;

  /* ## Pro Tip for Feedback:
When the user updates their reading progress for the day, trigger a pop-up modal or a toast notification that says: "Streak Maintained! You're on a 5-day roll!"
Should we add a mini-calendar below the streak to show which days were missed? */