import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import img1 from '../assets/images/log.svg';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
   
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      navigate('/profile');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Login failed');
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Login</h2>
            <div className="input-field">
              
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                autoComplete="off"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn solid">Login</button>

            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
          <p className="social-text">
            Don't have an account?{" "}
            <Link to="/register" className="link-btn">Sign Up</Link>
          </p>
        </div>
      </div>
      <div class="panels-container">
            <div class="panel right-panel">
                 
                <img src={img1} class="image" alt=""></img>
            </div>
      </div>
    </div>
  );
};

export default Login;
