import React, { useState } from "react";

import { clearTokens } from "../util/storage";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setLoggedIn = user => {
    setUser(user);
    setIsAuthenticated(true);
  };

  const setLoggedOut = () => {
    setUser({});
    setIsAuthenticated(false);
    clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setLoggedIn, setLoggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
