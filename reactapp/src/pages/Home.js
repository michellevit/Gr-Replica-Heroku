import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import Chart from "chart.js/auto";

const apiUrl = process.env.REACT_APP_API_URL;


const Home = (
  showError,
  errorMessage,
  numberOfDays,
  showChart,
  chartMax,
  chartNumbers,
  lastSevenDaysPurchaseTotal,
  lastMonthPurchaseTotal,
  purchaseTotal
) => {
  const { user } = useContext(UserContext);
  const chartRef = useRef(null);

  useEffect(() => {
    if (user) {
      fetchAllLinksData();
    }
  }, [user]); // Dependency on user ensures data is fetched when user logs in

  const fetchAllLinksData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/links/homechart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'  // Ensuring cookies are sent with the request
      });
      if (response.ok) {
        const links = await response.json();
        renderChart(links);
      } else {
        console.error("Failed to fetch link data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching link data:", error);
    }
  };

  const renderChart = (links) => {
    const ctx = chartRef.current.getContext("2d");
    if (ctx && links.length > 0) {
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: links.map(link => link.name),
          datasets: [{
            label: "Number of Downloads",
            data: links.map(link => link.number_of_downloads),
            backgroundColor: "rgba(204, 51, 63, 0.7)",
            borderColor: "rgba(235, 104, 65, 0.8)",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
      return chart; 
    } else {
      console.error("No chart context available or no links data.");
    }
  };

  return (
    <div>
      <div id="dashboard">
        <h3>Welcome {user?.name}</h3>
        <div className="chart">
          <canvas ref={chartRef} width="640" height="225"></canvas>
        </div>
        <div className="mini-rule"></div>

      <div id="history">
        <h4>History:</h4>
        <p>
          <strong>${lastSevenDaysPurchaseTotal}</strong> in the past 7 days.
        </p>
        <p>
          <strong>${lastMonthPurchaseTotal}</strong> in the past month.
        </p>
        <p>
          <strong>${purchaseTotal}</strong> in total.
        </p>

        <div className="rainbow bar" id="loading-bar"></div>
      </div>

        <div className="rainbow bar" id="loading-bar"></div>
      </div>
    </div>
  );
};

export default Home;
