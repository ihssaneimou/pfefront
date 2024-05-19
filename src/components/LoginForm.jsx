

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [mail, setMail] = useState("");
  const [mot_de_passe, setmot_de_passe] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        mail,
        mot_de_passe,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      // Rediriger l'utilisateur vers la page d'accueil ou toute autre page après la connexion réussie
      window.location.href = "/home";
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      // Gérer les erreurs de connexion, par exemple afficher un message à l'utilisateur
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <input
          type="text"
          name="mail"
          placeholder="Mail"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="mot_de_passe"
          name="mot_de_passe"
          placeholder="mot_de_passe"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          value={mot_de_passe}
          onChange={(e) => setmot_de_passe(e.target.value)}
        />
        <button
          className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
          onClick={handleLogin}
        >
          LOGIN
        </button>
        <div className="w-full flex mt-4">
          <Link className="mx-auto text-blue-800">Mot de passe oublié ?</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;