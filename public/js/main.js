// Function to fetch video metrics based on user input
async function fetchVideoMetrics() {
    const searchQuery = document.getElementById("searchQuery").value;
    const videoMetricsContainer = document.getElementById("videoMetrics");
    videoMetricsContainer.innerHTML = ""; // Clear previous results
    
    if (!searchQuery) {
      videoMetricsContainer.innerHTML = "<p>Please enter a search term.</p>";
      return;
    }
    
    try {
      const response = await fetch(`/video-metrics?search_query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
  
      if (data.message) {
        videoMetricsContainer.innerHTML = `<p>${data.message}</p>`;
        return;
      }
  
      // Display video metrics
      data.forEach((video) => {
        const videoElement = document.createElement("div");
        videoElement.classList.add("video-item");
        videoElement.innerHTML = `
          <h3>${video.title}</h3>
          <p>Views: ${video.views}</p>
          <p>Likes: ${video.likes}</p>
          <p>Comments: ${video.comments}</p>
        `;
        videoMetricsContainer.appendChild(videoElement);
      });
    } catch (error) {
      videoMetricsContainer.innerHTML = "<p>Failed to fetch video metrics. Please try again later.</p>";
      console.error("Error fetching video metrics:", error);
    }
  }
  