import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css';

const LoginSignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const handleNavigation=(path)=>{
    navigate(path);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/users/${isSignup ? 'register' : 'login'}`, {
        username,
        password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/search');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-signup-page">
      <h2 className="login-signup-page__title">{isSignup ? 'Sign Up' : 'Login'}</h2>
      <form className="login-signup-page__form" onSubmit={handleSubmit}>
        <input
          className="login-signup-page__input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-signup-page__input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-signup-page__button" onClick={()=> handleNavigation('/search')} type="submit">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
      </form>
      <button className="login-signup-page__toggle-button" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'Dont have an account? Sign Up'}
      </button>
    </div>
  );
};

export default LoginSignupPage;
