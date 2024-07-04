import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginSignupPage from './components/LoginSignupPage';
import SearchPage from './components/SearchPage';
import ListsPage from './components/ListsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={<LoginSignupPage />}/>
        <Route path="/login" element={<LoginSignupPage />}/>
        <Route path="/search" element={<SearchPage />}/>
        <Route path="/lists" element={<ListsPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

