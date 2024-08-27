import React, { useState } from 'react';
import axios from './axiosintance'; // Import your Axios instance
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await axios.post('/signup', { username, password });


            setSuccess('Sign up successful! Redirecting to login...');
            navigate('/login');
        } catch (err) {
            if (err.response || err.response.data || err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Sign up failed. Please try again.');
            }
            setSuccess('');
            console.log(err)
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="site-title">Sign Up</h1>
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
                    <button type="submit" className="login-button">Sign Up</button>
                </form>
                <p className="switch-form">
                    Already have an account? <Link to="/login" className="switch-link">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
