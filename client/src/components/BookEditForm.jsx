import {
  useState,
  useEffect
} from 'react';
import {
  useToast
} from '../ToastContext';
import styles from './BookEditForm.module.css';

const GENRES = ['Programming', 'Self Help', 'Spiritual', 'Fiction', 'Non-Fiction', 'Science', 'Philosophy'];
const STATUSES = ['Reading', 'Completed', 'Want to Read'];

function BookEditForm ( {
  setEditing, updateBook, book
}) {
  const {
    showToast
  } = useToast();
  const [editForm,
    setEditForm] = useState({
      ...book
    });

  useEffect(() => {
    setEditForm({
      ...book
    });
  }, [])

  function handleEditChange(e) {
    const {
      name,
      value
    } = e.target;
    setEditForm(prev => ({
      ...prev, [name]: value
    }));
  }

  function handleSave() {
    // 1. Validation
    if (!editForm.title?.trim() || !editForm.author?.trim()) {
      return showToast('Title and author are required.', 'error');
    }

    const currentPage = Number(editForm.currentPage);
    const totalPages = Number(editForm.totalPages);

    if (currentPage > totalPages) {
      return showToast('Current page cannot exceed total pages.', 'error');
    }

    // 2. Prepare the clean data object first
    const cleanedData = {
      ...editForm,
      title: editForm.title.trim(),
      author: editForm.author.trim(),
      rating: Number(editForm.rating),
      currentPage,
      totalPages
    };

    // 3. Update both the local state and the external store/API
    setEditForm(cleanedData);
    updateBook(cleanedData);
    setEditing(false);
    showToast('Your changes has been saved.', 'success');
  }
  return (
    <div className={styles.bookPageSections}>
      <div className={styles.sectionOne}>
        <p className={styles.bookAvatar}>
          {editForm.title[0] || '?'}
        </p>
        <p className={styles.detailPageTitle}>
          Edit Book
        </p>
      </div>
      <div className={styles.editFormBody}>
        <div className={styles.editField}>
          <label className={styles.editLabel}>Title</label>
          <input
          className={styles.editInput}
          name="title"
          value={editForm.title}
          onChange={handleEditChange}
          placeholder="Book title"
          />
      </div>
      <div className={styles.editField}>
        <label className={styles.editLabel}>Author</label>
        <input
        className={styles.editInput}
        name="author"
        value={editForm.author}
        onChange={handleEditChange}
        placeholder="Author name"
        />
    </div>
    <div className={styles.editField}>
      <label className={styles.editLabel}>Genre</label>
      <select className={styles.editInput} name="genre" value={editForm.genre} onChange={handleEditChange}>
        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
      </select>
    </div>
    <div className={styles.editField}>
      <label className={styles.editLabel}>Status</label>
      <div className={styles.pillGroup}>
        {STATUSES.map(s => (
          <button
            key={s}
            type="button"
            className={`${styles.pill} ${editForm.status === s ? styles.pillActive: ''}`}
            onClick={() => setEditForm(prev => ({ ...prev, status: s }))}
            >
            {s}
          </button>
        ))}
      </div>
    </div>
    <div className={styles.editField}>
      <label className={styles.editLabel}>Rating</label>
      <div className={styles.starRating}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`${styles.star} ${Number(editForm.rating) >= star ? styles.starActive: ''}`}
            onClick={() => setEditForm(prev => ({ ...prev, rating: star }))}
            >
            ★
          </span>
        ))}
      </div>
    </div>
    <div className={styles.editField}>
      <label className={styles.editLabel}>Pages</label>
      <input className={styles.editInput} name="totalPages" value={editForm?.totalPages} onChange={handleEditChange}
      placeholder="Total pages"
      />
  </div>
  <div className={styles.editField}>
    <label className={styles.editLabel}>Current page</label>
    <input className={styles.editInput} name="currentPage" value={editForm?.currentPage} onChange={handleEditChange}
    placeholder="Current Page"
    />
</div>
</div>
<div className={styles.actionButtons}>
<button className={styles.deleteButton} onClick={() => setEditing(false)}>✕ Cancel</button>
<button className={styles.editButton} onClick={handleSave}>💾 Save Changes</button>
</div>
</div>
);
}

export default BookEditForm;