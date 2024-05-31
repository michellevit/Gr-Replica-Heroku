import React from 'react';

const Flickr = ({ showError, errorMessage }) => {
  return (
    <div>
      <div id="dashboard">
        {showError ? (
          <h3>Earn money from your Flickr photos <small className="error">{errorMessage}</small></h3>
        ) : (
          <h3>Earn money from your Flickr photos</h3>
        )}
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div className="rainbow bar"></div>
      </div>
      
      <div id="import-grid">
        <ul>
          {[...Array(8)].map((_, index) => (
            <li key={index}>
              <img src="http://www.sobi.org/photos/Cat/Mottle/OciCatB_004.jpg" alt="My cat" />
              <h4>My cat</h4>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </li>
          ))}
        </ul>
      </div>
          </div>
  );
};

export default Flickr;
