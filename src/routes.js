import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login/Login';
import Songs from './pages/Songs/Songs';
import App from './App';

export const RouterApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [artistTerm, setArtistTerm] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <div className="App">
        {!isLoggedIn ? (
          <Login handleLoginStatus={setIsLoggedIn} />
        ) : (
          <>
            <Navigation handleLoginStatus={setIsLoggedIn} />
            <Routes>
              <Route path="/" element={<App />} />
              <Route
                path="/artists/:artistName/songs/*"
                element={
                  <Songs
                    artistTerm={artistTerm}
                    setArtistTerm={setArtistTerm}
                  />
                }
              />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};
