import {
  Link,
  useLocation
} from 'react-router';
import styles from './Navbar.module.css';
import {
  soundManager
} from "../utils/soundManager";

/* const navItems = [{
  path: '/',
  label: 'Home',
  icon: HomeIcon
},
  {
    path: '/books',
    label: 'Books',
    icon: BookIcon
  },
  {
    path: '/add',
    label: 'Add',
    icon: AddIcon
  },
  {
    path: '/me',
    label: 'Me',
    icon: UserIcon
  },
];*/

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleClick = () => {
    soundManager.play("click");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link to="/" className={`${styles.navItem} ${isActive('/') ? styles.active: ''}`} style={ { textDecoration: 'none' }} onClick={handleClick}>
          <div className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          <div className={styles.navLabel}>
            Home
          </div>
        </Link>

        <Link to="/books" className={`${styles.navItem} ${isActive('/books') ? styles.active: ''}`} style={ { textDecoration: 'none' }} onClick={handleClick}>
          <div className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>

          <div className={styles.navLabel}>
            Books
          </div>
        </Link>

        <Link to="/add" className={`${styles.navItem} ${isActive('/add') ? styles.active: ''}`} style={ { textDecoration: 'none' }} onClick={handleClick}>
          <div className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>

          <div className={styles.navLabel}>
            Add
          </div>
        </Link>

        {/* Notification tab - hidden from nav bar since it's accessed via the bell icon on Home */}

        <Link to="/me" className={`${styles.navItem} ${isActive('/me') ? styles.active: ''}`} style={ { textDecoration: 'none' }} onClick={handleClick}>
          <div className={styles.navIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className={styles.navLabel}>
            Me
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;