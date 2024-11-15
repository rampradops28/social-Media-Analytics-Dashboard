/* const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import and use routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/youtube', require('./routes/youtubeRoutes'));


// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 */

// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// // Middleware
// app.use(express.json());
// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend URL
//   methods: 'GET, POST, PUT, DELETE',
//   allowedHeaders: 'Content-Type, Authorization',
// };
// app.use(cors(corsOptions));

// // MongoDB Connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
// connectDB();

// // Define Channel Schema and Model with Formatted Date and Local Time
// const channelSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   views: { type: Number, required: true },
//   likes: { type: Number, required: true },
//   comments: { type: Number, required: true },
//   createdAt: {
//     type: String,
//     default: () => {
//       const now = new Date();
//       const date = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
//       const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
//       const minutes = now.getMinutes().toString().padStart(2, '0');
//       const seconds = now.getSeconds().toString().padStart(2, '0');
//       const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
//       return `${date} ${hours}:${minutes}:${seconds} ${ampm}`;
//     },
//   },
// });
// const Channel = mongoose.model("Channel", channelSchema);

// // YouTube API Fetch Logic
// const fetchVideoMetrics = async (req, res) => {
//   try {
//     const searchQuery = req.query.search_query;
//     const apiKey = process.env.YOUTUBE_API_KEY || 'Your API key';
//     const apiUrl = "https://www.googleapis.com/youtube/v3";

//     if (!searchQuery) {
//       return res.status(400).json({ error: "Search query is required" });
//     }

//     const searchUrl = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${encodeURIComponent(searchQuery)}`;
//     const searchResponse = await axios.get(searchUrl);

//     if (!searchResponse.data.items.length) {
//       return res.json({ message: "No videos found for the given query." });
//     }

//     const videoIds = searchResponse.data.items.map((item) => item.id.videoId).join(",");
//     const videoMetricsUrl = `${apiUrl}/videos?key=${apiKey}&part=snippet,statistics&id=${videoIds}`;
//     const videoMetricsResponse = await axios.get(videoMetricsUrl);

//     const videoMetrics = videoMetricsResponse.data.items.map((video) => ({
//       title: video.snippet.title,
//       views: video.statistics.viewCount,
//       likes: video.statistics.likeCount,
//       comments: video.statistics.commentCount,
//     }));

//     res.json(videoMetrics);
//   } catch (error) {
//     console.error("Error fetching video metrics:", error.message);
//     res.status(500).send("Error fetching video metrics");
//   }
// };

// // Route to Save YouTube Channel Details with Date and Local Time to MongoDB
// app.post('/api/youtube/save-channel', async (req, res) => {
//   try {
//     const { title, views, likes, comments } = req.body;
//     const newChannel = new Channel({ title, views, likes, comments });
//     await newChannel.save();
//     res.status(201).json({ message: "Channel details saved successfully!" });
//   } catch (error) {
//     console.error("Error saving channel details:", error);
//     res.status(500).json({ error: "Failed to save channel details." });
//   }
// });

// // Routes
// app.get("/api/youtube/video-metrics", fetchVideoMetrics);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};
app.use(cors(corsOptions));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

// Define Channel Schema and Model with Formatted Date and Local Time
const channelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  views: { type: Number, required: true },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  createdAt: {
    type: String,
    default: () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      return `${date} ${hours}:${minutes}:${seconds} ${ampm}`;
    },
  },
});
const Channel = mongoose.model("Channel", channelSchema);

// YouTube API Fetch Logic
// Backend: Update fetchVideoMetrics in youtubeController.js
const fetchVideoMetrics = async (req, res) => {
  try {
    const searchQuery = req.query.search_query;
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiUrl = "https://www.googleapis.com/youtube/v3";

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const searchUrl = `${apiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${encodeURIComponent(searchQuery)}&maxResults=30`;
    const searchResponse = await axios.get(searchUrl);

    if (!searchResponse.data.items.length) {
      return res.json({ message: "No videos found for the given query." });
    }

    const videoIds = searchResponse.data.items.map((item) => item.id.videoId).join(",");
    const videoMetricsUrl = `${apiUrl}/videos?key=${apiKey}&part=snippet,statistics&id=${videoIds}`;
    const videoMetricsResponse = await axios.get(videoMetricsUrl);

    const videoMetrics = videoMetricsResponse.data.items.map((video) => ({
      title: video.snippet.title,
      views: video.statistics.viewCount,
      likes: video.statistics.likeCount,
      comments: video.statistics.commentCount,
      thumbnail: video.snippet.thumbnails.high.url || video.snippet.thumbnails.default.url,// Adding thumbnail URL
    }));

    res.json(videoMetrics);
  } catch (error) {
    console.error("Error fetching video metrics:", error.message);
    res.status(500).send("Error fetching video metrics");
  }
};


// Route to Save YouTube Channel Details with Date and Local Time to MongoDB
app.post('/api/youtube/save-channel', async (req, res) => {
  try {
    const { title, views, likes, comments } = req.body;
    const newChannel = new Channel({ title, views, likes, comments });
    await newChannel.save();
    res.status(201).json({ message: "Channel details saved successfully!" });
  } catch (error) {
    console.error("Error saving channel details:", error);
    res.status(500).json({ error: "Failed to save channel details." });
  }
});


// Routes
app.get("/api/youtube/video-metrics", fetchVideoMetrics);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
