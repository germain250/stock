// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, getCurrentUser } from '../services/authService';  // Correct import

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = async ({ email, password }) => {
    const currentUser = await loginUser({ email, password });
    setUser(currentUser);
    navigate('/admin');
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to access the auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
