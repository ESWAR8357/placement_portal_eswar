import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { getProfile, loginUser as loginUserRequest } from "../services/authService.js";

export const AuthContext = createContext(null);

const STORAGE_KEY = "placementPortalAuth";

const readStoredAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const hydrateAuth = async () => {
      const storedAuth = readStoredAuth();

      if (!storedAuth?.token) {
        setIsAuthLoading(false);
        return;
      }

      setToken(storedAuth.token);

      try {
        const profile = await getProfile();
        setUser(profile.user);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ token: storedAuth.token, user: profile.user })
        );
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    hydrateAuth();
  }, []);

  const login = useCallback(async (credentials) => {
    const data = await loginUserRequest(credentials);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const updateUser = useCallback(
    (nextUser) => {
      setUser(nextUser);

      if (token) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user: nextUser }));
      }
    },
    [token]
  );

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token && user),
      isAuthLoading,
      login,
      logout,
      updateUser
    }),
    [isAuthLoading, login, logout, token, updateUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
