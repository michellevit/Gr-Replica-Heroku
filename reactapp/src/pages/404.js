import React from 'react';

const NotFound = () => {
  return (
    <div>
      <h3>404</h3>
      <div className="mini-rule"></div>
      <p>You've reached a page that doesn't exist. <a href="/home">Go home?</a></p>
    </div>
  );
};

export default NotFound;
