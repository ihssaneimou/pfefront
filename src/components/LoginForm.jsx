import React, { useState } from 'react';
import axios from 'axios';
import { useToken } from '../App';
import logo from '../assets/fsac.png'; // Ensure the path to your logo image is correct
import './LoginForm.css'; // Import the custom CSS file

const LoginForm = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { token, setToken } = useToken();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        mail,
        password,
      });

      const accessToken = response.data.access_token;
      setToken(accessToken);
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
      <div className="login-container">
        <div className="login-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="login-form">
          <h2 className="login-title">S'authentifier</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="mail"
              placeholder="E-mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
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
    </div>
  );
};

export default LoginForm;
