// reactapp/src/pages/Links.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Links = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/links`, { withCredentials: true });
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const numberOfLinks = links.length;
  const linksMessage = numberOfLinks > 0 ? 'Here are your links:' : 'No links available.';

  return (
    <div>
      <div id="dashboard" className="links-page">
        <h3>
          {numberOfLinks} link{numberOfLinks !== 1 ? 's' : ''} <small>{linksMessage}</small>
        </h3>
        <a href="/add" className="button" id="add-link-button">Add link</a>
        {numberOfLinks > 0 && (
          <>
            <div className="mini-rule"></div>
            <ul id="links">
              {links.map(link => (
                <li key={link.unique_permalink}>
                  <Link to={`/edit/${link.unique_permalink}`}>{link.name}</Link>
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
