import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? title : 'Gumroad - Selling should be as easy as sharing a link.'}</title>
      <link type="text/css" rel="stylesheet" href="/css/style.css" />
      <link type="text/css" rel="stylesheet" href="/css/tipsy.css" />
      <link type="text/css" rel="stylesheet" href="/css/global.css" />
      <link type="text/css" rel="stylesheet" href="/css/app.css" />
      <meta property="og:site_name" content="Gumroad" />
      <meta property="og:title" content="Gumroad" />
      <meta property="og:url" content="http://gumroad.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Selling should be as easy as sharing a link." />
      <meta property="fb:page_id" content="http://www.facebook.com/gumroad" />
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js"></script>
      <script src="/js/fileuploader.js" type="text/javascript"></script>
      <script type="text/javascript" src="/js/jquery.tipsy.js"></script>
      <script type="text/javascript" src="/js/jquery.backgroundPosition.js"></script>
      <script type="text/javascript" src="/plupload/gears_init.js"></script>
      <script type="text/javascript" src="/plupload/plupload.full.min.js"></script>
      <script type="text/javascript" src="/js/app.js"></script>
      <script type="text/javascript" src="/js/gumroad.js"></script>
      <script type="text/javascript">
        {`
          var _gaq = _gaq || [];
          _gaq.push(['_setAccount', 'UA-3109196-41']);
          _gaq.push(['_trackPageview']);
          (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
          })();
        `}
      </script>
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    </Helmet>
  );
};

export default Head;
