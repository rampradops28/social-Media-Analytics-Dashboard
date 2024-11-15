import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/YouTube.css";

const Youtube = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videoMetrics, setVideoMetrics] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await axios.get(
        `http://localhost:5000/api/youtube/video-metrics?search_query=${searchQuery}`
      );
      setVideoMetrics(response.data.map(video => ({
        id: video.id,
        title: video.title,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        thumbnail: video.thumbnail,
      })));
      setSubscriberCount(response.data.subscriberCount);
    } catch (err) {
      console.error("Error fetching video metrics:", err);
      setError("Error fetching video metrics. Please try again.");
    }
    setLoading(false);
  };

  const handleSaveChannel = async (video) => {
    try {
      await axios.post("http://localhost:5000/api/youtube/save-channel", {
        id: video.id,
        title: video.title,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        thumbnail: video.thumbnail,
      });
      alert("Channel details saved successfully!");
    } catch (error) {
      console.error("Error saving channel details:", error);
      alert("Failed to save channel details.");
    }
  };

  const navigateToAnalysis = (videoId) => {
    navigate(`/Ytanalysis/${videoId}`);
  };

  const navigateToAllanalysis = () => {
    navigate("/Allanalysis", { state: { videoMetrics } }); // Pass videoMetrics as state
  };

  return (
    <div className="youtube-container">
      <h1 className="youtube-title">YouTube Video Metrics</h1>

      <form onSubmit={handleSearch} className="youtube-search-form">
        <label htmlFor="search_query" className="search-label">
          Enter Video Search Query:
        </label>
        <input
          type="text"
          id="search_query"
          name="search_query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required
          className="search-input"
        />
        <button
          onClick={navigateToAllanalysis} // Direct call to the function
          className="navigate-analysis"
        >
          Analysis
        </button>
        <button type="submit" className="search-button">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {loading && <p className="loading-message">Loading...</p>}

      {subscriberCount && (
        <p className="subscriber-count">
          <strong>Subscriber Count:</strong> {subscriberCount}
        </p>
      )}

      <div className="video-results">
        {videoMetrics.length > 0 ? (
          videoMetrics.map((video, index) => (
            <div key={index} className="video-card">
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <h3 className="video-title">{video.title}</h3>
              <p className="video-stat"><strong>Views:</strong> {video.views}</p>
              <p className="video-stat"><strong>Likes:</strong> {video.likes}</p>
              <p className="video-stat"><strong>Comments:</strong> {video.comments}</p>
              <button
                onClick={() => handleSaveChannel(video)}
                className="save-button"
              >
                Save Channel
              </button>
              <button
                onClick={() => navigateToAnalysis(video.id)} // Pass videoId to analysis
                className="navigate-analysis"
              >
                Go to Analysis
              </button>
            </div>
          ))
        ) : (
          !error && <p className="no-results">No results to display</p>
        )}
      </div>
    </div>
  );
};

export default Youtube;
