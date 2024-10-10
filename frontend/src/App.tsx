import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import Preloader from './components/Preloader';
import Auth from './components/Auth';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/auth');
    }, 3600);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="App">
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <h1>Welcome to the Library Management System</h1>
        </div>
      )}
    </div>
  );
};

const Main: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default Main;