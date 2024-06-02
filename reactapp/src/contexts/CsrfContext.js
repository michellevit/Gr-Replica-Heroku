// src/contexts/CsrfContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CsrfContext = createContext();

export const CsrfProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log('API URL:', apiUrl);
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/csrf_token`);
        const data = await response.json();
        setCsrfToken(data.csrf_token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return (
    <CsrfContext.Provider value={csrfToken}>
      {children}
    </CsrfContext.Provider>
  );
};
