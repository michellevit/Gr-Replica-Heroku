import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Head from '../nav/Head';
import Header from '../nav/Header';

const LinkForm = ({ editing, permalink, uploadUrl, errorMessage, name, price, url, previewUrl, description, downloadLimit, views, conversion, numberOfDownloads, totalProfit }) => {
  const [showError, setShowError] = useState(false);
  const [linkToShare, setLinkToShare] = useState('');

  useEffect(() => {
    $(document).ready(function(){
      $("#delete_link").click(function(){
        showConfirm();
      });

      $(".share_link").click(function(){
        $(".share_link").select();
      });

      $('#download_limit').tipsy({trigger: 'focus', gravity: 'w', html: 'true'});
      $('#link_to_share').tipsy({trigger: 'hover', gravity: 'w', html: 'true'});

      $('#link_to_share').click(function(){
        this.select();
      });

      const uploader = new window.plupload.Uploader({
        runtimes: 'gears,html5,flash,html4',
        browse_button: 'pickfile',
        container: 'container',
        url: uploadUrl,
        use_query_string: false,
        multipart: true,
        flash_swf_url: '/plupload/plupload.flash.swf',
      });

      uploader.bind('FilesAdded', function(up, files) {});
      uploader.bind('UploadProgress', function(up, file) {
        $('#pickfile').html(file.percent + '% done uploading...');
      });
      uploader.bind('FileUploaded', function(up, file, response) {
        $("#url").val(response.response);
        $('#pickfile').html('Uploaded!').addClass('hidden');
      });
      uploader.bind('Error', function(up, err) {
        $('#pickfile').html("Upload error: " + err.message);
      });
      uploader.bind('QueueChanged', function(up) {
        $('#pickfile').html('Upload started...');
        uploader.start();
      });

      uploader.init();

      const uploader2 = new window.plupload.Uploader({
        runtimes: 'gears,html5,flash,html4',
        browse_button: 'pickpreviewfile',
        container: 'preview_container',
        url: uploadUrl,
        use_query_string: false,
        multipart: true,
        flash_swf_url: '/plupload/plupload.flash.swf',
      });

      uploader2.bind('FilesAdded', function(up, files) {});
      uploader2.bind('UploadProgress', function(up, file) {
        $('#pickpreviewfile').html(file.percent + '% done uploading...');
      });
      uploader2.bind('FileUploaded', function(up, file, response) {
        $("#preview_url").val(response.response);
        $('#pickpreviewfile').html('Uploaded!').addClass('hidden');
      });
      uploader2.bind('Error', function(up, err) {
        $('#pickpreviewfile').html("Upload error: " + err.message);
      });
      uploader2.bind('QueueChanged', function(up) {
        $('#pickpreviewfile').html('Upload started...');
        uploader2.start();
      });

      uploader2.init();

      function showConfirm() {
        // eslint-disable-next-line no-restricted-globals
        var r = confirm("Are you sure you want to delete this link? There's no going back!");
        if (r) {
          postToUrl('/delete/' + permalink);
        }
      }

      function postToUrl(path, params, method) {
        method = method || "post";
        const form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for (var key in params) {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
      }

      window.popup = function(url) {
        window.open(url, 'Share on Twitter', 'height=150,width=550');
      }
    });
  }, [permalink, uploadUrl]);

  return (
    <div>
      <Head title="Link Form" />
      <Header showLoginLink={false} loggedIn={true} userBalance={0} onLinksPage={true} />

      {editing && (
        <div id="share-box">
          <a href={`javascript:window.open('http://www.facebook.com/dialog/feed?app_id=114816261931958&redirect_uri=http://gumroad.com/home&display=popup&message=Buy%20'+encodeURIComponent(name)+'%20on%20Gumroad!&link='+linkToShare, 'Share', 'width=400,height=200,scrollbars=yes');`} className="facebook button">Share on Facebook</a>
          <p><input type="text" value={linkToShare} id="link_to_share" readOnly="readonly" title="Share this link to sell!" /></p>
          <a href={`javascript:popup('http://twitter.com/share?text=Buy%20'+encodeURIComponent(name)+'%20on%20Gumroad!&via=gumroad&url='+linkToShare);`} className="twitter button">Share on Twitter</a>

          <div id="analytics-box">
            <p><strong>{views}</strong> views <span className="arrow">&rarr;</span> <img src={`https://chart.googleapis.com/chart?chf=bg,s,00000000&cht=p&chd=t:${conversion},${100-conversion}&chds=0,100&chs=100x100&chco=797874,79787420`} height="20" width="20" alt="Conversion Chart" /> <span>{conversion}%</span> <span className="arrow">&rarr;</span> <strong>{numberOfDownloads}</strong> downloads at ≈ <strong>{price}</strong> <span className="arrow">&rarr;</span> <strong>{totalProfit}</strong> in profit!</p>
          </div>
        </div>
      )}

      <form id="large-form" action={editing ? `/edit/${permalink}` : "/create"} method="post" className={editing ? "editing-link" : ""}>
        {editing ? (
          <>
            <a href="#" id="delete_link">delete this link</a>
            <h3>Edit link {showError && <small className="error">{errorMessage}</small>}</h3>
          </>
        ) : (
          <h3>Create a new link {showError && <small className="error">{errorMessage}</small>}</h3>
        )}

        <p>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" placeholder="name" defaultValue={name} />
        </p>
        <p>
          <label htmlFor="price">Price:</label>
          <input id="price" name="price" type="text" placeholder="$10" defaultValue={price} />
        </p>
        <p>
          <label htmlFor="url">URL:</label>
          <input id="url" name="url" type="text" placeholder="http://" defaultValue={url} />
          <div id="container"><a id="pickfile" href="#">Or click to upload a file...</a></div>
        </p>
        <p>
          <label htmlFor="preview_url">Preview URL:</label>
          <input id="preview_url" name="preview_url" type="text" placeholder="http://" defaultValue={previewUrl} />
          <div id="preview_container"><a id="pickpreviewfile" href="#">Or click to upload a file...</a></div>
        </p>
        <p>
          <label htmlFor="description">Description:<br /><span className="faint">(optional)</span></label>
          <textarea id="description" name="description" defaultValue={description}></textarea>
        </p>
        
        <p><button type="submit">{editing ? "Save changes" : "Add link"}</button></p>
        
        {editing && (
          <>
            <div className="mini-rule"></div>
            <div id="link-options">
              <h4>Additional link options:</h4>
              <p>
                <label htmlFor="download_limit">Download limit:</label>
                <input id="download_limit" name="download_limit" type="text" placeholder="0" defaultValue={downloadLimit} title="The number of people that can purchase this item. 0 means no limit!" />
              </p>
            </div>
          </>
        )}
        
        <div className="rainbow bar"></div>
      </form>

      <p id="below-form-p">&nbsp;</p>
    </div>
  );
};

export default LinkForm;
