import { useRoutes, useLocation } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SplashScreen from './pages/SplashScreen';
import WelcomeSlides from './pages/WelcomeSlides';
import AuthPage from './pages/AuthPage';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import Notifications from './pages/Notifications';
import BookDetail from './pages/BookDetail';
import Me from './pages/Me';
import Settings from './pages/Settings';
import Search from './pages/Search';

const HIDE_NAVBAR = [
  '/notifications',
  '/settings',
  '/search',
  '/auth',
  '/welcome',
  '/splash',
];

function AppRoutes({ books, addBook, setBooks, updateBook }) {
  const location = useLocation();

  const routes = useRoutes([
    // Public routes — no auth needed
    { path: '/splash', element: <SplashScreen /> },
    { path: '/welcome', element: <WelcomeSlides /> },
    { path: '/auth', element: <AuthPage /> },

    // Protected routes — must be logged in
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Home books={books} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/books',
      element: (
        <ProtectedRoute>
          <Books books={books} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/books/:id',
      element: (
        <ProtectedRoute>
          <BookDetail books={books} setBooks={setBooks} updateBook={updateBook} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/add',
      element: (
        <ProtectedRoute>
          <AddBook onAdd={addBook} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/me',
      element: (
        <ProtectedRoute>
          <Me books={books} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/notifications',
      element: (
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      ),
    },
    {
      path: '/settings',
      element: (
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: '/search',
      element: (
        <ProtectedRoute>
          <Search books={books} />
        </ProtectedRoute>
      ),
    },
  ]);

  const showNavbar =
    !HIDE_NAVBAR.some((path) => location.pathname.startsWith(path)) &&
    !location.pathname.match(/^\/books\/.+/);

  return (
    <>
      {routes}
      {showNavbar && <Navbar />}
    </>
  );
}

export default AppRoutes;