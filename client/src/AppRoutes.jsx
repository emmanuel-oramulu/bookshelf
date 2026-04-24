import {
  useRoutes,
  useLocation
} from 'react-router';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Notifications from './pages/Notifications';
import BookDetail from './pages/BookDetail';
import Me from './pages/Me';
import Settings from './pages/Settings';
import Search from './pages/Search';

const HIDE_NAVBAR = ['/notifications', '/settings', '/search'];

function AppRoutes( {
  books, addBook, setBooks, updateBook
}) {
  const location = useLocation();
  const routes = useRoutes([{
    path: '/', element: <Home books={books} />
  },
    {
      path: '/books', element: <Books books={books} />
    },
    {
      path: '/books/:id', element: <BookDetail books={books} setBooks={setBooks} updateBook={updateBook} />
    },
    {
      path: '/add', element: <AddBook onAdd={addBook} />
    },
    {
      path: '/me', element: <Me books={books} />
    },
    {
      path: '/notifications', element: <Notifications />
    },
    {
      path: '/settings', element: <Settings />
    },
    {
      path: '/search', element: <Search books={books} />},
  ]);

  const showNavbar = !HIDE_NAVBAR.some(path => location.pathname.startsWith(path)) && !location.pathname.match(/^\/books\/\d+/);

  return (
    <>
      {routes}
      {showNavbar && <Navbar />}
    </>
  );
}

export default AppRoutes;