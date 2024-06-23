import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/fsac.png';
import './LoginForm.css';

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { mail, password });
      const accessToken = response.data.access_token;
      localStorage.setItem('token', accessToken);
      window.location.href = '/home';
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Erreur lors de la connexion. Veuillez vérifier vos identifiants.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="banner"></div>
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="login-form">
          <h2 className="login-title">S'authentifier</h2>
          <form onSubmit={handleLogin}>
            <div className="flex items-center relative mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 absolute right-3">
                <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6zm-5-3a5 5 0 1110 0A5 5 0 013 6zm5 6c-2.5 0-4.5 1-4.5 1.5S5.5 15 8 15s4.5-.5 4.5-1.5S10.5 9 8 9z" clipRule="evenodd"/>
              </svg>
              <input
                type="text"
                name="mail"
                placeholder="E-mail"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="login-input pl-10 pr-4 py-2 rounded" // Adjust padding left for the icon
                required
              />
            </div>
            <div className="flex items-center relative mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 absolute right-3">
                <path fillRule="evenodd" d="M8 2a3 3 0 00-3 3v1H4.5A1.5 1.5 0 003 7.5v6A1.5 1.5 0 004.5 15h7a1.5 1.5 0 001.5-1.5v-6A1.5 1.5 0 0011.5 6H11V5a3 3 0 00-3-3zM5 8h6v5H5V8zm4-2V5a2 2 0 10-4 0v1h4z" clipRule="evenodd"/>
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input pl-10 pr-4 py-2 rounded" // Adjust padding left for the icon
                required
              />
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
      <div className="banner"></div>
    </div>
  );
};

export default LoginForm;
