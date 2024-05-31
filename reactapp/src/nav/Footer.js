import React from 'react';
import CopyrightP from './CopyrightP';

const Footer = ({ hideFooter }) => {
  if (hideFooter) return null;
  return (
    <div>
      <div id="push"></div>
      <div id="footer">
        <div id="inner-footer">
            <CopyrightP />
            <p id="footer-navigation">
            <a href="/about">About</a> &bull; 
            <a href="/faq">FAQ</a> &bull; 
            <a href="http://twitter.com/gumroad/">Twitter</a> &bull; 
            <a href="http://facebook.com/gumroad/">Facebook</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
