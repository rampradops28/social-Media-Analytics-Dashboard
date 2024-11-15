// src/Home.jsx
import React from 'react';
import '../css/Home.css';

const Home = () => {
    return (
        <div>
            <header>
                <nav>
                    <div className="logo">Social Media Analytics Dashboard</div>
                    <ul className="menu">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/report">Reports</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </nav>
                <div className="hero">
                    <h1>Welcome to Social Media Analytics</h1>
                    <p>Your go-to dashboard for tracking and improving social media engagement!</p>
                    <button type="button" className="hero-button">Get Started</button>
                </div>
            </header>
            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature">
                        <h3>Real-Time Analytics</h3>
                        <p>Get updates as they happen across all major social platforms.</p>
                    </div>
                    <div className="feature">
                        <h3>Custom Reports</h3>
                        <p>Generate and download personalized reports to meet your needs.</p>
                    </div>
                    <div className="feature">
                        <h3>Engagement Insights</h3>
                        <p>Understand audience behaviors and trends with detailed insights.</p>
                    </div>
                </div>
            </section>
            <footer>
                <p>&copy; 2024 Social Media Analytics Dashboard | Contact Us: <a href="mailto:support@example.com">support@example.com</a></p>
            </footer>
        </div>
    );
};

export default Home;
