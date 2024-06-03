import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Login = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: emailAddress,
          password: e.target.password.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        setShowError(false);
        setUser(data.user);
        navigate('/home');
      } else {
        setShowError(true);
        setErrorMessage(data.error);
      }
    } catch (error) {
      setShowError(true);
      setErrorMessage('An error occurred. Please try again.');
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
