import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Artists from './pages/Artists/Artists';
import Login from './pages/Login/Login';
import Songs from './pages/Songs/Songs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {!isLoggedIn ? (
        <Login handleLoginStatus={setIsLoggedIn} />
      ) : (
        <>
          <Navigation handleLoginStatus={setIsLoggedIn} />
          <Routes>
            <Route path="/" element={<Artists />} />
            <Route path="/songs" element={<Songs />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
