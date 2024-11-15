import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
// import "./css/AllAnalysis.css";

const AllAnalysis = () => {
  const location = useLocation();
  const videoMetrics = location.state?.videoMetrics || []; // Retrieve videoMetrics from state

  const chartData = {
    labels: videoMetrics.map(video => video.title),
    datasets: [
      {
        label: "Views",
        data: videoMetrics.map(video => video.views),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Likes",
        data: videoMetrics.map(video => video.likes),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Comments",
        data: videoMetrics.map(video => video.comments),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="all-analysis-container">
      <h1 className="all-analysis-title">Channel Video Comparison</h1>
      {videoMetrics.length > 0 ? (
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p className="no-data-message">No video data available for analysis.</p>
      )}
    </div>
  );
};

export default AllAnalysis;
