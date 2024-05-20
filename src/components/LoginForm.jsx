import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToken } from "../App";

const LoginForm = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token, setToken } = useToken();  // Correctly destructure token and setToken

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", {
        mail,
        password,
      });

      const accessToken = response.data.access_token;
      setToken(accessToken);
      localStorage.setItem("token", accessToken);

      // Redirect the user to the home page or any other page after successful login
      window.location.href = "/home";
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setErrorMessage("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="mail"
            placeholder="Mail"
            className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <button
            type="submit"
            className={`w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "LOGIN"}
          </button>
        </form>
        <div className="w-full flex mt-4">
          <Link to="/forgot-password" className="mx-auto text-blue-800">Mot de passe oublié ?</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
