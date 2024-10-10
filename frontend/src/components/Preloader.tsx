import React, { useEffect, useState } from 'react';
import '../styles/Preloader.css';

const loadingMessages = [
    "Loading, please wait...",
    "Gathering book data...",
    "Setting up your library...",
    "Almost there...",
];

const Preloader: React.FC = () => {
    const [message, setMessage] = useState(loadingMessages[0]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
            setMessage(loadingMessages[index]);
        }, 1000);

        return () => clearInterval(interval);
    }, [index]);

    return (
        <div className="preloader-container">
            <h1 className="preloader-title">Library Management System</h1>
            <div className="book">
                <div className="book__pg-shadow"></div>
                <div className="book__pg"></div>
                <div className="book__pg book__pg--2"></div>
                <div className="book__pg book__pg--3"></div>
                <div className="book__pg book__pg--4"></div>
                <div className="book__pg book__pg--5"></div>
            </div>
            <p className="loading-message">{message}</p>
            <p className="copyright-message">© 2024 Mufli Mohideen. All Rights Reserved.</p>
        </div>
    );
};

export default Preloader;
