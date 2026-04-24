import {
  useState,
  useEffect
} from 'react';
import {
  useParams,
  Link,
  useNavigate
} from 'react-router';
import {
  useToast
} from '../ToastContext';
import Header from '../components/Header';
import ProgressBar from '../components/ProgressBar';
import PageTransition from '../components/PageTransition';
import BookEditForm from '../components/BookEditForm';
import styles from './BookDetail.module.css';



function BookDetail( {
  books, setBooks, updateBook
}) {
  const {
    showToast
  } = useToast();
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const book = books.find(book => book.id === Number(id));

  const [editing,
    setEditing] = useState(false);
  const [menu,
    setMenu] = useState(false);


  function startEdit() {
    setEditing(true);
  }


  function handleDelete() {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    setBooks(prev => prev.filter(b => b.id !== book.id));
    navigate(-1);
    showToast(`"${book.title}" has been deleted.`, 'success');
  }



  if (!book) {
    return (
      <div className={styles.bookDetailPage}>
        <Link to="/books" className={styles.backLink}>← Back</Link>
        <p>
          Book not found!
        </p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className={styles.bookDetailPage}>
        <Header title={book.title} setMenu={setMenu} />

        {editing ? (<BookEditForm book={book} setEditing={setEditing} updateBook={updateBook} />): (
          <div className={styles.bookPageSections}>
            <section className={styles.mainSection}>
              <div className={styles.sectionOne}>
                <div className={styles.bookAvatar}>
                  {book?.title?.[0] || "?"}
                </div>

                <h1 className={styles.detailTitle}>
                  {book.title}
                </h1>

                <p className={styles.detailAuthor}>
                  {book.author}
                </p>

                <span className={styles.statusBadge}>
                  {book.status}
                </span>
              </div>
              <div className={styles.sectionTwo}>
                {[{
                  label: 'Genre', value: book.genre
                },
                  {
                    label: 'Status', value: book.status
                  },
                  {
                    label: 'Rating', value: '⭐'.repeat(Number(book.rating))
                  },
                  {
                    label: 'Year', value: book.year
                  }, {
                    label: "Pages", value: book.totalPages
                  }, {
                    label: 'Current page', value: book.currentPage
                  },
                ].map((item) => (
                    <div key={item.label} className={styles.detailCard}>
                      <p className={styles.itemLabel}>
                        {item.label}
                      </p>
                      <p className={styles.itemValue}>
                        {item.value}
                      </p>
                    </div>
                  ))} < /div> < div className = {`
                ${styles.menu} ${!menu ? styles.collapse: ""}`} >
                <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Delete</button>
                <button className={styles.editButton} onClick={startEdit}>✏️ Edit Details</button>
              </div>
            </section>
              <div className={styles.sectionThree}>
                <ProgressBar book={book} />
              </div>
            < /div>
            )}
          </div>
        </PageTransition>
      );
      }

      export default BookDetail;

      /* {
      book.fileUrl && (
        <iframe
          src={book.fileUrl}
          className={styles.pdfViewer}
          />
      )} */