import React, { useState, useEffect } from "react";
import axios from "axios";

import { useToken } from "../App";

const HistoriqueSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [nomSession, setNomSession] = useState("");
  const [typeSession, setTypeSession] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const { token, setToken } = useToken();

  useEffect(() => {
    
    if (!token) {
      alert("No token found. Please log in.");
    
      return;
    }

    axios
      .get("http://localhost:8000/api/session", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/session/create",
        {
          nom_session: nomSession,
          type_session: typeSession,
          datedebut: dateDebut,
          datefin: dateFin,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Session ajoutée avec succès!");
      document.getElementById("my_modal_1").close();
      setSessions([...sessions, response.data]);
      setNomSession("");
      setTypeSession("");
      setDateDebut("");
      setDateFin("");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la session", error);
      alert("Erreur lors de l'ajout de la session");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-3 gap-4 items-center mb-4">
        <div>
          <h1 className="text-xl mb-4">Historique des sessions</h1>
        </div>
        <div>
          <label className="input input-bordered flex bg-gray-300 items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="btn mx-auto w-48 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Créer session
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-gray-200 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-4">Créer une session</h3>
              <form onSubmit={handleSubmit}>
                <select
                  className="select bg-gray-300 select-bordered w-full max-w-xs mb-4"
                  name="nom_session"
                  value={nomSession}
                  onChange={(e) => setNomSession(e.target.value)}
                >
                  <option disabled value="">
                    Nom session
                  </option>
                  <option value="Automne-hiver">Automne-hiver</option>
                  <option value="Printemps-été">Printemps-été</option>
                </select>
                <select
                  className="select bg-gray-300 select-bordered w-full max-w-xs"
                  name="type_session"
                  value={typeSession}
                  onChange={(e) => setTypeSession(e.target.value)}
                >
                  <option disabled value="">
                    Type session
                  </option>
                  <option value="Normale">Normale</option>
                  <option value="Rattrapage">Rattrapage</option>
                </select>
                <div className="mt-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date début :
                  </label>
                  <input
                    type="date"
                    className="input bg-gray-300 w-full max-w-xs"
                    name="datedebut"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date fin :
                  </label>
                  <input
                    type="date"
                    className="input bg-gray-300 w-full max-w-xs"
                    name="datefin"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
                <div className="modal-action grid grid-cols-3 gap-4 items-center">
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Confirmer
                  </button>
                  <div></div>
                  <button
                    type="button"
                    className="btn text-white bg-red-400 border-none hover:bg-red-500"
                    onClick={() => document.getElementById("my_modal_1").close()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <table className="table lg:w-[70vw] w-full">
        <thead>
          <tr className="text-slate-700">
            <th>Nom session</th>
            <th>Type session</th>
            <th>Date debut</th>
            <th>Date fin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session, id_session) => (
            <tr key={id_session}>
              <td>{session.nom_session}</td>
              <td>{session.type_session}</td>
              <td>{session.datedebut}</td>
              <td>{session.datefin}</td>
              <td>
                <button className="btn btn-ghost btn-xs">Consulter</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoriqueSessions;
