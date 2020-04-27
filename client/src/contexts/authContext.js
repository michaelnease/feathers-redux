import React, { useState, useEffect } from 'react';
import client from '../app/feathers';
export const AuthContext = React.createContext({});

// This file will be repaced with Auth0 or AWS Cognito

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticationError, setIsAuthenticationError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    await client
      .reAuthenticate()
      .then((res) => setIsAuthenticated(res.user))
      .catch(() => setIsAuthenticated(false))
      .then(() => setIsLoading(false));
  };

  const login = async (credentials) => {
    try {
      // First try to log in with an existing JWT
      return await client.reAuthenticate();
    } catch (error) {
      // If that errors, log in with email/password
      // Here we would normally show a login page

      // to get the login information
      return await client
        .authenticate(
          {
            strategy: 'local',
            ...credentials,
          },
          {
            query: {
              active: true,
              'applications.site': 'g8keeper',
            },
          },
        )
        .then((res) => {
          return res.user;
        })
        .then((user) => {
          setIsAuthenticated(user);
          setIsAuthenticationError(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setIsAuthenticationError(true);
        });
    }
  };

  const logout = async () => {
    await client.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isAuthenticationError,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
