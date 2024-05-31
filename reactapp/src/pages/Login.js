import React, { useState } from 'react';

const Login = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
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
