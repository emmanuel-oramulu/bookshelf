import {
  useNavigate,
  useLocation
} from 'react-router';
import styles from './Header.module.css';

export default function Header ( {
  title, setMenu
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return(<div className={styles.header}>
    <div onClick={() => { navigate(-1)}} className={styles.iconBtn}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12H5" />/
        <path d="m12 19-7-7 7-7" />
      </svg>
    </div>
    <div className={styles.headerLabel} title={title}>
      {title}
    </div>
    <div className={styles.rightSlot}>
      {location.pathname.match(/^\/books\/\d+/) &&
      <div className={styles.moreBtn} onClick={() => { setMenu(prev => !prev)}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960" fill="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M479.86-160Q460-160 446-174.14t-14-34Q432-228 446.14-242t34-14Q500-256 514-241.86t14 34Q528-188 513.86-174t-34 14Zm0-272Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm0-272Q460-704 446-718.14t-14-34Q432-772 446.14-786t34-14Q500-800 514-785.86t14 34Q528-732 513.86-718t-34 14Z" />
        </svg>
      </div>
      }
    </div>
    {
    /*<div className={styles.perforation}></div>
      */
    } < /div>
    );
    }