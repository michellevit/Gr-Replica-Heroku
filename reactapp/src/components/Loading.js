// Loading.js

import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBarBackgroundOffset, setLoadingBarBackgroundOffset] = useState(0);

  useEffect(() => {
    const animateLoadingBar = setInterval(() => {
      if (isLoading) {
        setLoadingBarBackgroundOffset(prevOffset => prevOffset + 20);
      }
    }, 600);

    return () => clearInterval(animateLoadingBar);
  }, [isLoading]);

  const showLoading = () => {
    setIsLoading(true);
    $('#loading-indicator').slideDown('fast'); // Slide down the loading indicator
  };

  const hideLoading = () => {
    setIsLoading(false);
    $('#loading-indicator').slideUp('fast'); // Slide up the loading indicator
  };

  return (
    <div id="loading-indicator" style={{ display: 'none' }}>
      <div id="loading-bar" style={{ backgroundPosition: `${loadingBarBackgroundOffset}px 0` }}></div>
    </div>
  );
};

export default Loading;
