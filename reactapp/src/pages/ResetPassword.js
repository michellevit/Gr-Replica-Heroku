import React, { useState, useContext } from 'react';
import { CsrfContext } from '../contexts/CsrfContext';

const ForgotPassword = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const csrfToken = useContext(CsrfContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/forgot_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        setShowError(false);
      } else {
        setErrorMessage(data.error);
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      setShowError(true);
    }
  };

  return (
    <div>
      <form id="large-form" onSubmit={handleSubmit}>
        {showError ? (
          <h3>Enter your email address <small className="error">{errorMessage}</small></h3>
        ) : (
          successMessage ? (
            <h3>{successMessage}</h3>
          ) : (
            <h3>Enter your email address <small>And don't worry about forgetting your password, we do too!</small></h3>
          )
        )}
        <p>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <button type="submit">Send email</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default ForgotPassword;
