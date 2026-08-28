
import { createContext, useContext, useState } from 'react';

const Context = createContext(null);

function readStoredUser() {
  const token = localStorage.getItem('jwt_token') || localStorage.getItem('token');
  const rawUser = localStorage.getItem('user');

  if (!token || !rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    return { username: rawUser, role: 'ROLE_USER' };
  }
}

function normalizeToken(token) {
  if (!token) return '';
  return String(token).replace(/^Bearer\s+/i, '');
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const login = (token, userPayload) => {
    const normalizedToken = normalizeToken(token);
    const nextUser = userPayload || { username: 'Admin', role: 'ROLE_ADMIN' };

    localStorage.setItem('token', normalizedToken);
    localStorage.setItem('jwt_token', normalizedToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Context.Provider value={{ user, login, logout }}>
      {children}
    </Context.Provider>
  );
}

export const useAuth = () => useContext(Context);
