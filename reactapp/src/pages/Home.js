import React, { useState, useEffect } from 'react';


const Home = ({ showError, errorMessage, numberOfDays, showChart, chartMax, chartNumbers, lastSevenDaysPurchaseTotal, lastMonthPurchaseTotal, purchaseTotal }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/check_logged_in`, {
          credentials: 'include',
        });
        if (response.ok) {
          const result = await response.json();
          setIsLoggedIn(result.loggedIn);
        } else {
          console.error('Error checking logged in status: ', response.statusText);
        }
      } catch (error) {
        console.error('Error checking logged in status:', error);
      }
    };
    checkLoggedInStatus();
  }, [apiUrl]);
  
  return (
    <div>
      <div id="dashboard">
        {showError ? (
          <h3 className="error">{errorMessage}</h3>
        ) : (
          <h3>Last {numberOfDays} day{numberOfDays > 1 ? 's' : ''}</h3>
        )}

        <div className="chart">
          {showChart ? (
            <img 
              src={`http://chart.apis.google.com/chart?chxr=0,0,${chartMax}&chf=bg,s,ffffff&chxt=y&chbh=a&chs=640x225&chco=CC333F,EB6841&cht=bvg&chds=0,${chartMax}&chd=t:${chartNumbers}`} 
              width="640" 
              height="225" 
              alt="Chart"
            />
          ) : (
            <p>Wait a few days and a chart will show up here!</p>
          )}
        </div>

        <div className="mini-rule"></div>

        <div id="history">
          <h4>History:</h4>
          <p><strong>${lastSevenDaysPurchaseTotal}</strong> in the past 7 days.</p>
          <p><strong>${lastMonthPurchaseTotal}</strong> in the past month.</p>
          <p><strong>${purchaseTotal}</strong> in total.</p>
        </div>

        <div className="rainbow bar" id="loading-bar"></div>
      </div>

      <p id="below-form-p">&nbsp;</p>

    </div>
  );
};

export default Home;
