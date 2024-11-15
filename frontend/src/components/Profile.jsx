import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Profile.css'
import img1 from '../assets/2.jpeg';

// Example user data (static)
 
const Profile = () => {
  const [user, setUser] = useState('ram'); // Store fetched user data (name, email)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }

        // Set the authorization header for the request
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch user data from backend
        const { data } = await axios.get('http://localhost:5000/api/auth/profile', config);
        console.log(data);
        // Set the fetched user data to the state (only name and email here)
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error if any

  return user ? (
 
        <div>
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

            <div className="profile-container">
                <div className="profile-header">
                    <img src={img1} alt="User Profile Picture" className="profile-pic" />
                    <h2>{user.username}</h2>
                    <p className="bio">
                        A Passionate content creator dedicated to inspiring and <br />engaging audiences
                        through captivating stories and visuals.
                    </p>
                </div>

                <div className="profile-details">
                    <div className="detail-box">
                        <h3>Name</h3>
                        <p>{user.username}</p>
                    </div>
                    <div className="detail-box">
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="detail-box">
                        <h3>Role</h3>
                        <p>Content Creator</p>
                    </div>
                    <div className="detail-box">
                        <h3>Account Created</h3>
                        <p>January 15, 2023</p>
                    </div>
                    <div className="detail-box">
                        <h3>Last Login</h3>
                        <p>October 10, 2024</p>
                    </div>
                    <div className="detail-box">
                        <h3>Subscription</h3>
                        <p>Premium</p>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2024 Social Media Analytics Dashboard | Contact Us: support@example.com</p>
            </footer>
        </div>
   

 
  ) : (
    <p>No user data available.</p>
  );
};

export default Profile;
