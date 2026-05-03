import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);

  const login = (data) => {
    setUser(data.user);
    setPermissions(data.permissions);
  };

  const logout = () => {
    setUser(null);
    setPermissions([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, permissions, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};