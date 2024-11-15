import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/Ytanalysis.css";

const Ytanalysis = () => {
  const { videoId } = useParams(); // Get videoId from route parameters
  const [savedMetrics, setSavedMetrics] = useState(null);
  const [currentMetrics, setCurrentMetrics] = useState(null);
  const [comparison, setComparison] = useState({});

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!videoId) {
        console.error("No video ID provided");
        return;
      }

      try {
        // Fetch saved metrics from your database
        const savedResponse = await axios.get(`http://localhost:5000/api/youtube/saved-metrics/${videoId}`);
        setSavedMetrics(savedResponse.data);

        // Fetch current metrics from the YouTube API
        const currentResponse = await axios.get(`http://localhost:5000/api/youtube/current-metrics/${videoId}`);
        setCurrentMetrics(currentResponse.data);

        // Calculate comparison
        setComparison({
          views: currentResponse.data.views - savedResponse.data.views,
          likes: currentResponse.data.likes - savedResponse.data.likes,
          comments: currentResponse.data.comments - savedResponse.data.comments,
        });
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, [videoId]);

  return (
    <div className="ytanalysis-container">
      <h2>Video Analysis</h2>

      <div className="metrics-container">
        {/* Left side: Saved Metrics */}
        {savedMetrics && (
          <div className="saved-metrics">
            <h3>Saved Metrics</h3>
            <p><strong>Date Saved:</strong> {savedMetrics.createdAt}</p>
            <p><strong>Views:</strong> {savedMetrics.views}</p>
            <p><strong>Likes:</strong> {savedMetrics.likes}</p>
            <p><strong>Comments:</strong> {savedMetrics.comments}</p>
          </div>
        )}

        {/* Right side: Current Metrics with Comparison */}
        {currentMetrics && (
          <div className="current-metrics">
            <h3>Current Metrics</h3>
            <p><strong>Date Retrieved:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Views:</strong> {currentMetrics.views} ({comparison.views >= 0 ? "+" : ""}{comparison.views})</p>
            <p><strong>Likes:</strong> {currentMetrics.likes} ({comparison.likes >= 0 ? "+" : ""}{comparison.likes})</p>
            <p><strong>Comments:</strong> {currentMetrics.comments} ({comparison.comments >= 0 ? "+" : ""}{comparison.comments})</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ytanalysis;
