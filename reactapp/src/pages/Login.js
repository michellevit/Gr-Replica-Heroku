import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CsrfContext } from '../contexts/CsrfContext';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const navigate = useNavigate();
  const csrfToken = useContext(CsrfContext); 
  
  useEffect(() => {
    console.log("checking if user logged in")
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch('/api/check_logged_in');
        if (response.ok) {
          const result = await response.json();
          setIsLoggedIn(result.loggedIn);
          console.log("LOGGED IN STATUS: ", result.loggedIn)
        } else {
          console.error('Error checking logged in status: ', response.statusText);
          console.log("ERROR: can't tell if user logged in")
        }
      } catch (error) {
        console.error('Error checking logged in status:', error);
        console.log("ERROR: can't tell if user logged in")
      }
    };
    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!csrfToken) {
      setShowError(true);
      setErrorMessage('CSRF token not found.');
      return;
    }
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken 
      },
      body: JSON.stringify({
        email: emailAddress,
        password: e.target.password.value
      })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      setShowError(false);
      setIsLoggedIn(true);
    } else {
      setShowError(true);
      setErrorMessage(data.error);
    }
  };

  return (
    <div>
      <form id="large-form" onSubmit={handleSubmit}>
        {showError ? (
          <h3>Log in to Gumroad <small className="error">{errorMessage}</small></h3>
        ) : (
          <h3>Log in to Gumroad <small>Did we tell you we love you?</small></h3>
        )}
        <p>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Log in</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p"><a href="/forgot-password">Forgot your password?</a> We all do.</p>
    </div>
  );
};

export default Login;
