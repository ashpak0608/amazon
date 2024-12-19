import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
        } else {
            setError('');
            // Submit registration data to backend
            console.log({ name, email, password });
        }
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2 className="registration-title">Create Account</h2>

                {error && <div className="error-message">{error}</div>}

                <form className="registration-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="registration-button">
                        Register
                    </button>
                </form>

                <div className="registration-footer">
                    <p>
                        Already have an account? <Link to="/signin">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
