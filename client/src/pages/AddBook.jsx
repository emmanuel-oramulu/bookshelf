import {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useNavigate
} from 'react-router';
import PageTransition from '../components/PageTransition';
import handlePdfUpload from '../components/PdfPageCounter';
import {
  useToast
} from '../ToastContext';
import styles from './AddBook.module.css';

const GENRES = ['Programming', 'Self Help', 'Spiritual', 'Fiction', 'Non-Fiction', 'Science', 'Philosophy'];
const STATUSES = ['Reading', 'Completed', 'Want to Read'];

function AddBook( {
  onAdd
}) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const {
    showToast
  } = useToast();
  const [form,
    setForm] = useState( {
      title: '',
      author: '',
      genre: GENRES[0],
      status: 'Want to Read',
      totalPages: '',
      currentPage: 'null',
      startDate: 'null',
      rating: 0,
      year: new Date().getFullYear().toString(),
      fileUrl: '',
    });
  const [loadingPdf,
    setLoadingPdf] = useState(false);
  const [fileName,
    setFileName] = useState('');


  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setForm(prev => ({
      ...prev, [name]: value
    }));
  };

  // Reseter
  const handleStatusChange = (status) => {
    setForm(prev => {
      const reset =
      status === 'Completed'
      ? {
        totalPages: '',
        currentPage: '',
        startDate: '',
        fileUrl: ''
      }: {};

      return {
        ...prev,
        status,
        ...reset
      };
    });

    setFileName('');
    setLoadingPdf(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      showToast('Please fill in title and author', 'error');
      return;
    }

    const currentPage = Number(form.currentPage);
    const totalPages = Number(form.totalPages);

    if (currentPage > totalPages) {
      showToast('Current page cannot exceed total pages', 'error');
      return;
    }

    const cleanedData = {
      ...form,
      id: Date.now(),
      rating: Number(form.rating),
      title: form.title.trim(),
      author: form.author.trim(),
      currentPage,
      totalPages
    };
    onAdd(cleanedData);

    showToast('Book added successfully! 📚', 'success');
    navigate('/books');
  };

  return (
    <PageTransition>
      <div className={styles.addPage}>
        <div className={styles.header}>
          <h1>New Entry</h1>
          <p>
            Add a new masterpiece to your shelf
          </p>
        </div>

        <form className={styles.addForm} onSubmit={handleSubmit}>
          {/* Main Info Group */}
          <div className={styles.section}>
            <div className={styles.inputGroup}>
              <input
              name="title"
              placeholder="Book Title"
              value={form.title}
              onChange={handleChange}
              className={styles.mainInput}
              />
          </div>
          <div className={styles.inputGroup}>
            <input
            name="author"
            placeholder="Author Name"
            value={form.author}
            onChange={handleChange}
            className={styles.mainInput}
            />
        </div>
      </div>

      {/* Genre Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Genre</label>
        <div className={styles.pillGrid}>
          {GENRES.map(g => (
            <button
              key={g}
              type="button"
              className={`${styles.pill} ${form.genre === g ? styles.activePill: ''}`}
              onClick={() => setForm(prev => ({ ...prev, genre: g }))}
              >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Status Selection */}
      <div className={styles.section}>
        <label className={styles.label}>Reading Status</label>
        <div className={styles.statusGroup}>
          {STATUSES.map(s => (
            <button
              key={s}
              type="button"
              className={`${styles.statusBtn} ${form.status === s ? styles.activeStatus: ''}`}
              onClick={() => setForm(prev => ({ ...prev, status: s }))}
              onClick={() => handleStatusChange(s)}
              >
              {s === 'Reading' ? '📖 ': s === 'Completed' ? '✅ ': '🔖 '}
              {s}
            </button>
          ))}
        </div>
      </div>

      {/*File info/upload*/}
      {form.status !== "Completed" && (<div className={styles.section}>
        <label className={styles.label}>Set File Details</label>
        <div className={styles.flexRow}>
          <div className={styles.inputGroup}>
            <input
            type="number"
            name="totalPages"
            placeholder="Total Pages"
            value={form.totalPages}
            onChange={handleChange}
            className={styles.bookInput} />
        </div>
        <div className={styles.inputGroup}>
          <input
          type="number"
          name="currentPage"
          placeholder="Current Page"
          value={form.currentPage}
          onChange={handleChange}
          className={styles.bookInput} />
      </div>
      </div>
      <div className={styles.inputGroup} style={ { display: 'flex', flexFlow: 'column nowrap', }}>
        <label className={styles.label}>Start Date</label>
        <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className={styles.bookInput} />
    </div>
    <div className={styles.inputGroup}>
      <label className={styles.fileUpload}>
        <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => { handlePdfUpload(e, setForm, setLoadingPdf, setFileName); e.target.value = ''; }}
        hidden
        />
      <span className={styles.uploadBtn}>
        📄 Upload PDF
      </span>
    </label>
    {fileName && (
      <div className={styles.filePreview}>
        <span>📄 {fileName}</span>
        <button
          onClick={() => {
            setFileName('');
            setForm(prev => ({
              ...prev,
              fileUrl: '',
              totalPages: ''
            }));
            setLoadingPdf(false);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          >
          ❌
        </button>
      </div>
    )}
    {loadingPdf && <p className={styles.loadingPdf}>
      Reading PDF...
    </p>
    }
  </div>
</div>
)}


{/* Star Rating */}
<div className={styles.section}>
<label className={styles.label}>Initial Rating</label>
<div className={styles.starRating}>
{[1,
2,
3,
4,
5].map(star => (
<span
key={star}
className={`${styles.star} ${form.rating >= star ? styles.starActive: ''}`}
onClick={() => setForm(prev => ({ ...prev, rating: star }))}
>
★
</span>
))}
</div>
</div>

<button type="submit" className={styles.submitBtn} disabled={!form.title || !form.author}>
Confirm Entry 🖋️
</button>
</form>
</div>
</PageTransition>
);
}

export default AddBook;