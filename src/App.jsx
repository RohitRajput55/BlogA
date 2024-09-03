// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogPage from './Components/BlogPage';
import BlogPost from './Components/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/post/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
