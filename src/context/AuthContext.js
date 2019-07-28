import React, { useEffect, useState } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import { getJwt, getRefresh, clearTokens } from "../util/storage";
import { getUser } from "../api/authentication";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = async () => {
    if (getJwt() && getRefresh()) {
      setLoading(true);
      const {
        data: { data }
      } = await getUser();

      if (data) {
        setLoggedIn(toCamelCase(data));
        return;
      }
    }
    clearTokens();
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const setLoggedIn = user => {
    setUser(user);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const setLoggedOut = () => {
    setUser({});
    setIsAuthenticated(false);
    clearTokens();
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, setLoggedIn, setLoggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
