import React, { useEffect, useState } from "react";
import { camelizeKeys as toCamelCase } from "humps";

import {
  setJwt,
  getJwt,
  setRefresh,
  getRefresh,
  clearTokens
} from "../util/storage";
import { getUserFromJwt } from "../util/jwt";
import { refresh } from "../api/authentication";

const AuthContext = React.createContext();

const isLoggedIn = async () => {
  if (!getJwt() || !getRefresh()) {
    return false;
  }

  let { jwtUser, error } = getUserFromJwt(getJwt());
  if (!!jwtUser) {
    return jwtUser;
  }

  if (error && error === "expired jwt") {
    const {
      data: { data }
    } = await refresh(getRefresh());

    if (data) {
      const { jwt, refreshToken } = toCamelCase(data);
      setJwt(jwt);
      setRefresh(refreshToken);

      let { jwtUser } = getUserFromJwt(jwt);
      return jwtUser;
    }
  }
  return false;
};

export const AuthProvider = ({ redirectPath, children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const jwtUser = await isLoggedIn();
      jwtUser ? setLoggedIn(toCamelCase(jwtUser)) : clearTokens();
      setLoading(false);
    })();
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
      value={{
        redirectPath,
        user,
        isAuthenticated,
        loading,
        setLoggedIn,
        setLoggedOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
