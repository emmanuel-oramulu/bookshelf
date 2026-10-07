import {
  useState,
  useEffect,
  createContext,
  useContext
} from 'react';

const AuthContext = createContext();

export function AuthProvider ( {
  children
}) {
  const [loading,
    setLoading] = useState(true);
  const [user,
    setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('bookshelf_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  },
    []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('bookshelf_user',
      JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bookshelf_user');
  };

  return (
    <AuthContext.provider value={ { user,
      loading,
      login,
      logout }}>
      {children}
    </AuthContext.provider>
  );
}

export function useAuth () {
  return useContext(AuthContext);
}