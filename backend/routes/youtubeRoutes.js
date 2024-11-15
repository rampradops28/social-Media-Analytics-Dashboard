// youtubeRoutes.js
const express = require("express");
const { fetchVideoMetrics, saveChannelDetails } = require("../controllers/youtubeController");

const router = express.Router();

// Define routes using the imported controller functions
router.get("/video-metrics", fetchVideoMetrics);
router.post("/save-channel", saveChannelDetails);

module.exports = router;
