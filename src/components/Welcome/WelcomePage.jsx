// src/components/Welcome/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ user }) => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/'); // Redirect to the home page or dashboard
    };

    return (
        <div className="welcome-page">
            <h1>Welcome, {user.fullName}!</h1>
            <p>Thank you for logging in. You can now access all the services available to you.</p>
            <button onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default WelcomePage;