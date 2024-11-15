// import React, { useEffect, useState } from 'react';
// import '../css/Dashboard.css';

// const Dashboard = () => {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         // Fetch initial user data from the backend when component mounts
//         // You can replace this with your actual API call
//         const fetchData = async () => {
//             const response = await fetch('/api/user-metrics');
//             const data = await response.json();
//             setUserData(data);
//         };
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <header>
//                 <nav>
//                     <div className="logo">Social Media Analytics Dashboard</div>
//                     <div className="menu">
//                         <a href="/home">Home</a>
//                         <a href="/dashboard">Dashboard</a>
//                         <a href="/report">Reports</a>
//                         <a href="/profile">Profile</a>
//                         <a href="/logout">Logout</a>
//                     </div>
//                 </nav>
//             </header>

//             <main>
//                 <section className="overview">
//                     <h2>Dashboard Overview</h2>
//                     <p>Real-time engagement metrics and user insights</p>
//                 </section>

//                 <section className="analytics">
//                     <h3>YouTube Channel Details</h3>
                    
//                     {userData ? (
//                         <div className="data">
//                             <p><strong>User ID (YouTube):</strong> {userData.youtubeUserId}</p>
//                             <p><strong>Channel Name:</strong> {userData.channelName}</p>
//                             <p><strong>Total Views:</strong> {userData.totalViews}</p>
//                             <p><strong>Total Subscribers:</strong> {userData.subscribers}</p>
//                             <p><strong>Average Engagement Rate:</strong> {userData.engagementRate}%</p>
//                             <p><strong>Data Retrieved On:</strong> {userData.retrievedAt}</p>
//                         </div>
//                     ) : (
//                         <p>Loading user data...</p>
//                     )}
                    
//                     <h3>Saved Metrics Comparison</h3>
//                     <div className="comparison">
//                         {userData && userData.metrics && userData.metrics.length > 0 ? (
//                             userData.metrics.map((metric, index) => (
//                                 <div key={index} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
//                                     <p><strong>Metric Date:</strong> {metric.date}</p>
//                                     <p><strong>Views:</strong> {metric.views}</p>
//                                     <p><strong>Likes:</strong> {metric.likes}</p>
//                                     <p><strong>Comments:</strong> {metric.comments}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No saved metrics to compare. Please save initial data.</p>
//                         )}
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;

import React from 'react';
import '../css/Dashboard.css';
import youtubeIcon from '../assets/images/youtubelogo.webp'; // Example paths, add your icon paths
import instagramIcon from '../assets/images/instagramlogo.avif';
import twitterIcon from '../assets/images/fblogo.png';
import linkedinIcon from '../assets/images/linkedinlogo.webp'; 
import { Link, useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const goToYoutubePage = () => {
    navigate('/youtube'); // Navigate to YouTube page
  };
    return (
        <div className="dashboard-container">
            <header>
                <nav>
                    <div className="logo">Social Media Analytics Dashboard</div>
                    <div className="menu">
                        <a href="/home">Home</a>
                        <a href="/dashboard">Dashboard</a>
                        <a href="/report">Reports</a>
                        <a href="/profile">Profile</a>
                        <a href="/logout">Logout</a>
                    </div>
                </nav>
            </header>

            <main className="main-content">
                <section className="overview">
                    <h2>Select a Social Media Platform</h2>
                    <p>Choose a platform to view and analyze engagement metrics.</p>
                </section>

                <section className="social-media-selection">
                    <div className="social-media-option">
                        <img src={youtubeIcon} alt="YouTube" onClick={goToYoutubePage}/>
                        <p>YouTube</p>
                    </div>
                    <div className="social-media-option">
                        <img src={instagramIcon} alt="Instagram" />
                        <p>Instagram</p>
                    </div>
                    <div className="social-media-option">
                        <img src={twitterIcon} alt="Twitter" />
                        <p>Facebook</p>
                    </div>
                    <div className="social-media-option">
                        <img src={linkedinIcon} alt="LinkedIn" />
                        <p>LinkedIn</p>
                    </div>
                </section>

                <section className="description">
                    <p>Welcome to your centralized hub for social media insights. Select a platform to view in-depth analytics, compare metrics over time, and stay informed on engagement trends.</p>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 Social Media Analytics Dashboard | Contact Us: support@example.com</p>
            </footer>
        </div>
    );
};

export default Dashboard;