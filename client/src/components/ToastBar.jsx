import styles from './ToastBar.module.css';
const ICONS = {
  success: '/success.png',
  error: '/error.png',
  warn: '/warn.png',
}

function ToastBar ( {
  msg, show, type
}) {
  const icon = ICONS[type];

  return (
    <div className={`${styles.toastBar} ${show ? '': styles.show}`} role="alert">
      <div className={styles.toastWrapper} >
        <img src='/success.png' alt="" key={type} className={styles.toastIcon} />
      <p className={styles.toastMessage}>
        {msg}
      </p>
    </div>
  </div>
);
}

export default ToastBar;