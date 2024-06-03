import React, { useState, useContext } from 'react';
import { Tooltip } from 'react-tooltip';
import Modal from 'react-modal';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; // Adjust the path as necessary

Modal.setAppElement('#root'); // Ensure this matches the root element in your HTML

const apiUrl = process.env.REACT_APP_API_URL;

function popup(url) {
  window.open(url, 'Share on Twitter', 'height=150,width=550');
}

const Link = ({ editing, permalink, uploadUrl, errorMessage, name, price, url, previewUrl, description, downloadLimit, views, conversion, numberOfDownloads, totalProfit }) => {
  const { user } = useContext(UserContext); // Access user context
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: name || '',
    price: price || '',
    url: url || '',
    previewUrl: previewUrl || '',
    description: description || '',
    downloadLimit: downloadLimit || 0,
  });
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (field === 'url') {
      setFile(file);
    } else if (field === 'previewUrl') {
      setPreviewFile(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowError(true);
      console.error('User is not logged in');
      return;
    }

    const method = editing ? 'PUT' : 'POST';
    const endpoint = editing ? `/api/links/${permalink}` : '/api/links';
    const url = `${apiUrl}${endpoint}`;

    const form = new FormData();
    form.append('link[name]', formData.name);
    form.append('link[price]', formData.price);
    form.append('link[url]', formData.url);
    form.append('link[preview_url]', formData.previewUrl);
    form.append('link[description]', formData.description);
    form.append('link[download_limit]', formData.downloadLimit);
    form.append('link[user_id]', user.id); // Add user_id to form data

    if (file) form.append('file', file);
    if (previewFile) form.append('preview_file', previewFile);

    try {
      const response = await axios({
        method: method,
        url: url,
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201 || response.status === 200) {
        window.location.href = editing ? `/edit/${response.data.unique_permalink}` : `/home`;
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setShowError(true);
    }
  };

  const handleDelete = () => {
    postToUrl(`/delete/${permalink}`);
  };

  const postToUrl = (path, params, method) => {
    method = method || 'post';
    const form = document.createElement('form');
    form.setAttribute('method', method);
    form.setAttribute('action', path);

    for (const key in params) {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);
      form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      {editing && (
        <div id="share-box">
          <button type="button" onClick={() => window.open(`http://www.facebook.com/dialog/feed?app_id=114816261931958&redirect_uri=http://gumroad.com/home&display=popup&message=Buy%20${encodeURIComponent(name)}%20on%20Gumroad!&link=${formData.url}`, 'Share', 'width=400,height=200,scrollbars=yes')} className="facebook button">Share on Facebook</button>
          <div>
            <input
              type="text"
              value={formData.url}
              id="link_to_share"
              readOnly="readonly"
              title="Share this link to sell!"
              data-tip="Share this link to sell!"
            />
            <Tooltip />
          </div>
          <button type="button" onClick={() => popup(`http://twitter.com/share?text=Buy%20${encodeURIComponent(name)}%20on%20Gumroad!&via=gumroad&url=${formData.url}`)} className="twitter button">Share on Twitter</button>

          <div id="analytics-box">
            <p>
              <strong>{views}</strong> views <span className="arrow">&rarr;</span>{' '}
              <img
                src={`https://chart.googleapis.com/chart?chf=bg,s,00000000&cht=p&chd=t:${conversion},${100 - conversion}&chds=0,100&chs=100x100&chco=797874,79787420`}
                height="20"
                width="20"
                alt="Conversion Chart"
                data-tip={`${conversion}%`}
              />{' '}
              <span>{conversion}%</span> <span className="arrow">&rarr;</span>{' '}
              <strong>{numberOfDownloads}</strong> downloads at ≈ <strong>{price}</strong>{' '}
              <span className="arrow">&rarr;</span> <strong>{totalProfit}</strong> in profit!
              <Tooltip />
            </p>
          </div>
        </div>
      )}

      <form id="large-form" onSubmit={handleSubmit} className={editing ? 'editing-link' : ''}>
        {editing ? (
          <>
            <button type="button" id="delete_link">delete this link</button>
            <h3>Edit link {showError && <small className="error">{errorMessage}</small>}</h3>
          </>
        ) : (
          <h3>Create a new link {showError && <small className="error">{errorMessage}</small>}</h3>
        )}

        <p>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" placeholder="name" value={formData.name} onChange={handleChange} data-tip="Enter the name of your link" />
          <Tooltip />
        </p>
        <p>
          <label htmlFor="price">Price:</label>
          <input id="price" name="price" type="text" placeholder="$10" value={formData.price} onChange={handleChange} data-tip="Enter the price" />
          <Tooltip />
        </p>
        <div className="upload-container">
          <label htmlFor="url">URL:</label>
          <input id="url" name="url" type="text" placeholder="http://" value={formData.url} onChange={handleChange} data-tip="Enter the URL" />
          <div id="container">
            <input type="file" id='file-button' onChange={(e) => handleFileUpload(e, 'url')} />
          </div>
          <Tooltip />
        </div>
        <div className="upload-container">
          <label htmlFor="preview_url">Preview URL:</label>
          <input id="preview_url" name="preview_url" type="text" placeholder="http://" value={formData.previewUrl} onChange={handleChange} data-tip="Enter the preview URL" />
          <div id="preview_container">
            <input type="file" id='file-button' onChange={(e) => handleFileUpload(e, 'previewUrl')} />
          </div>
          <Tooltip />
        </div>
        <p>
          <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} data-tip="Enter the description"></textarea>
          <Tooltip />
        </p>

        <p><button type="submit">{editing ? 'Save changes' : 'Add link'}</button></p>

        {editing && (
          <>
            <div className="mini-rule"></div>
            <div id="link-options">
              <h4>Additional link options:</h4>
              <p>
                <label htmlFor="download_limit">Download limit:</label>
                <input id="download_limit" name="download_limit" type="text" placeholder="0" value={formData.downloadLimit} onChange={handleChange} data-tip="The number of people that can purchase this item. 0 means no limit!" />
                <Tooltip />
              </p>
            </div>
          </>
        )}

        <div className="rainbow bar"></div>
      </form>

      <Modal
        isOpen={isFileModalOpen}
        onRequestClose={() => setIsFileModalOpen(false)}
        contentLabel="File Upload Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Upload a File</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, 'url')} />
        <button onClick={() => setIsFileModalOpen(false)}>Cancel</button>
      </Modal>

      <Modal
        isOpen={isPreviewModalOpen}
        onRequestClose={() => setIsPreviewModalOpen(false)}
        contentLabel="Preview Upload Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Upload a Preview File</h2>
        <input type="file" onChange={(e) => handleFileUpload(e, 'previewUrl')} />
        <button onClick={() => setIsPreviewModalOpen(false)}>Cancel</button>
      </Modal>

      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default Link;
