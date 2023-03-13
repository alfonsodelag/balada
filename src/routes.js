import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';

export const RouterApp = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
