import React, { useState } from 'react';

const ResetPassword = ({ resetHash }) => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

  return (
    <div>
      <form id="large-form" action={`/reset-password/${resetHash}`} method="post" onSubmit={handleSubmit}>
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
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Reset Password and Login</button>
        </p>
        <div className="rainbow bar"></div>
      </form>
      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default ResetPassword;
