import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ConversionChart = ({ conversion }) => {
  const data = {
    labels: ['Converted', 'Not Converted'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [conversion, 100 - conversion],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default ConversionChart;
