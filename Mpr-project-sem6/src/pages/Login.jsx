import React, { useState } from 'react';
import axios from './axiosintance'; // Import the Axios instance
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { username, password });

      // Assuming the backend responds with a token
      const { token } = response.data;

      if (token) {
        onLogin(token); // Pass token to the onLogin function
        setSuccess('Login successful! Redirecting...');
        navigate('/home'); // Redirect to home page
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="site-title">Connect.IO</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="switch-form">
          Don't have an account? <Link to="/signup" className="switch-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
