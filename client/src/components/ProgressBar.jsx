import styles from './ProgressBar.module.css';

function ProgressBar ( {
  book
}) {

  const progress = book.totalPages > 0 ? (book.currentPage / book.totalPages): 0;
  const percentage = Math.min(Math.max(progress * 100, 0), 100).toFixed(1);
  const strokeOffset = 314 - (314 * (progress));

  return (
    <div className={styles.progressBar}>
      <svg width="120" height="120">
        <circle
          className={styles.background}
          cx="60"
          cy="60"
          r="50"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
        <circle
          className={styles.progress}
          cx="60"
          cy="60"
          r="50"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={ { strokeDashoffset: strokeOffset }}
          />
      </svg>
      <div className={styles.progressText}>
        {percentage}%
      </div>
    </div>
  );
}

export default ProgressBar;