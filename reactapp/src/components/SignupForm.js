import React, { useState } from 'react';

const SignupForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign up for Gumroad</h3>
      <p>Fill in the simple form below and start selling in minutes</p>
      <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Start selling!</button>
    </form>
  );
};

export default SignupForm;
