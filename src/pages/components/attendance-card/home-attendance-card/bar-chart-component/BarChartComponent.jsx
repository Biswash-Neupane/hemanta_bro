import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  indexAxis: "x",
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      barPercentage: 1.25,
      categoryPercentage: 0.8,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: true,
  aspectRatio: 3,
};

const BarChartComponent = (props) => {
  const data = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: props.GraphColor,
        borderColor: props.GraphColor,
        borderWidth: 1,
        barThickness: 10,
      },
    ],
  };

  return (
    <div style={{ width: "6rem", height: "2rem" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChartComponent;
