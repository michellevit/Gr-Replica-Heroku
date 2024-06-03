import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const ResetPassword = ({ resetHash }) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/reset_password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress, password, resetHash }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setSuccessMessage(data.message || 'Password reset successfully. You can now log in with your new password.');
        setShowError(false);
        navigate('/home');
      } else {
        setErrorMessage(data.error || 'An error occurred. Please try again.');
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
          <h3>Reset your password <small className="error">{errorMessage}</small></h3>
        ) : (
          successMessage ? (
            <h3>{successMessage}</h3>
          ) : (
            <h3>Reset your password <small>And don't worry about forgetting your password, we do too!</small></h3>
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
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Reset Password and Login</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default ResetPassword;
