import React from 'react';

const Stats = ({
  numberOfLinks,
  numberOfUsers,
  purchaseTotal,
  numberOfPurchases,
  averagePurchase,
  numberOfViews,
  numberOfDownloads,
  averageViews,
  averageDownloads,
  lastLinkDate,
  lastPurchaseDate
}) => {
  return (
    <div>
      <div id="main-content">
        <h3>Gumroad lets you sell just like you share.</h3>

        <div className="mini-rule"></div>

        <p>There are <strong>{numberOfLinks}</strong> links and counting.</p>
        <p>There are <strong>{numberOfUsers}</strong> users and counting.</p>
        <p>There have been $<strong>{purchaseTotal}</strong> worth of purchases. There are <strong>{numberOfPurchases}</strong> purchases and counting.</p>
        <p>That's an average of $<strong>{averagePurchase}</strong> per purchase!</p>
        <p>They've been viewed <strong>{numberOfViews}</strong> times and downloaded <strong>{numberOfDownloads}</strong> times.</p>
        <p>That's an average of <strong>{averageViews}</strong> views and <strong>{averageDownloads}</strong> downloads per link!</p>
        <p>The last link was added <strong>{lastLinkDate}</strong> ago.</p>
        <p>The last purchase was made <strong>{lastPurchaseDate}</strong> ago.</p>
      </div>
    </div>
  );
};

export default Stats;
