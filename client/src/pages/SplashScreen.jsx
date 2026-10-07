import {
  useEffect
} from 'react';
import {
  useNavigate
} from 'react-router-dom';
import {
  useAuth
} from '../context/AuthContext';
import styles from './SplashScreen.module.css';

export default function SplashScreen () {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();

  useEffect(() => {
    if (loading) return;
    const timer = setTimeOut(() => {
      if (user) {
        navigate('/', {
          replace: true
        });
      } else {
        const hasSeenWelcome = localStorage.getItem('bookshelf_welcome');
        if (hasSeenWelcome) {
          navigate('/auth', {
            replace: true
          })
        } else {
          navigate('/welcome', {
            replace: true
          });
        }
      }
    },
      2500);
    return () => clearTimeOut(timer);
  }, [loading, user, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        📚
      </div>
      <h1 className={styles.title}>
        BookShelf
      </h1>
      <p className={styles.tagline}>
        Your reading life, organized.
      </p>
      <div className={styles.loader} />
    </div>
  );
}