import React from 'react';


const Links = ({ numberOfLinks, linksMessage, links }) => {
  return (
    <div>
      
      <div id="dashboard" className="links-page">
        <h3>{numberOfLinks} link{numberOfLinks !== 1 ? 's' : ''} <small>{linksMessage}</small></h3>

        <a href="/add" className="button" id="add-link-button">Add link</a>

        {numberOfLinks > 0 && (
          <>
            <div className="mini-rule"></div>
            <ul id="links">
              {links.map(link => (
                <li key={link.unique_permalink}>
                  <a href={`/edit/${link.unique_permalink}`}>{link.name}</a> 
                  <small>${link.formatted_price}</small>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="rainbow bar"></div>
      </div>
      
      <p id="below-form-p">&nbsp;</p>
      
    </div>
  );
};

export default Links;
