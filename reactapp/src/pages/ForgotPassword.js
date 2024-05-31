import React from 'react';

const ForgotPassword = ({ showError, errorMessage, successMessage, emailAddress }) => {
  return (
    <div>
      <form id="large-form" action="/forgot-password" method="post">
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
          <input type="text" placeholder="Email Address" name="email" defaultValue={emailAddress} />
          <button type="submit">Send email</button>
        </p>
        <div className="rainbow bar"></div>
      </form>

      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default ForgotPassword;
