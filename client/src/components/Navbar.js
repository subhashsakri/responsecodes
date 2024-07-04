import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="navbar-brand-button" onClick={() => handleNavigation('/')}>
          HTTP Response Codes
        </button>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="nav-link" onClick={() => handleNavigation('/search')}>
            Search
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => handleNavigation('/lists')}>
            Lists
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={() => handleNavigation('/login')}>
            Login/Signup
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;