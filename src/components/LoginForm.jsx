import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToken } from '../App';
import logo from '../assets/fsac.png'; // Assurez-vous que le chemin d'accès à votre image est correct
import backgroundImage from '../assets/facc.jpeg'; // Assurez-vous que le chemin d'accès à votre image est correct

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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Section du formulaire */}
      <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '2rem' }}>
          <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', borderRadius: '8px' }} />
        </div>
        <div>
          <h2 style={{ color: '#00A5E3', textAlign: 'center' }}>S'authentifier</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="mail"
              placeholder="E-mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              style={{ width: '100%', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f8ff', color: '#333', fontSize: '1rem' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#f0f8ff', color: '#333', fontSize: '1rem' }}
            />
            {errorMessage && (
              <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
            )}
            <button
              type="submit"
              style={{ width: '100%', padding: '1rem', backgroundColor: '#00A5E3', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer' }}
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