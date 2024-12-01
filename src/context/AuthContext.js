import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const login = async (credentials) => {
    // Handle login logic
    const response = await loginUser(credentials);
    setUser(response.user);
    setUserType(response.userType);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login }}>
      {children}
    </AuthContext.Provider>
  );
}