import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../App";
import './HistoriqueSessions.css'; // Assurez-vous que le chemin est correct

const HistoriqueSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [nomSession, setNomSession] = useState("");
  const [typeSession, setTypeSession] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:8000/api/session", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSessions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sessions", error);
      });
  }, [token]);

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

  const filteredSessions = sessions.filter((session) =>
    session.nom_session?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);
  const currentSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfPageToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfPageToShow) {
        for (let i = 1; i <= maxPagesToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - halfPageToShow) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - halfPageToShow; i <= currentPage + halfPageToShow; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="mx-1 px-3 py-1">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="session-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
        <div>
          <h1 className="session-heading">Historique des sessions</h1>
        </div>
        <div className="flex justify-center">
          <label className="input input-bordered flex bg-white items-center gap-2 shadow-sm rounded w-full max-w-md">
            <input
              type="text"
              className="search-input grow bg-transparent p-2"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            className="button"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Créer session
          </button>
        </div>
      </div>
      <div className="session-table-container bg-white shadow-md rounded-lg overflow-hidden max-w-full mx-auto">
        <div className="table-responsive">
          <table className="table-auto w-full table-full-width">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-2">Nom session</th>
                <th className="px-4 py-2">Type session</th>
                <th className="px-4 py-2">Date début</th>
                <th className="px-4 py-2">Date fin</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.map((session, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{session.nom_session}</td>
                  <td className="px-4 py-2">{session.type_session}</td>
                  <td className="px-4 py-2">{session.datedebut}</td>
                  <td className="px-4 py-2">{session.datefin}</td>
                  <td className="px-4 py-2">
                    <button className="btn btn-ghost text-blue-600">Consulter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-[-8] mb-5">
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          {renderPagination()}
          <button
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="font-bold text-xl mb-4">Créer une session</h3>
          <form onSubmit={handleSubmit}>
            <select
              className="select bg-gray-200 select-bordered w-full mb-4"
              name="nom_session"
              value={nomSession}
              required
              onChange={(e) => setNomSession(e.target.value)}
            >
              <option disabled value="">
                Nom session
              </option>
              <option value="Automne-hiver">Automne-hiver</option>
              <option value="Printemps-été">Printemps-été</option>
            </select>
            <select
              className="select bg-gray-200 select-bordered w-full mb-4"
              name="type_session"
              value={typeSession}
              required
              onChange={(e) => setTypeSession(e.target.value)}
            >
              <option disabled value="">
                Type session
              </option>
              <option value="Normale">Normale</option>
              <option value="Rattrapage">Rattrapage</option>
            </select>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date début :
              </label>
              <input
                type="date"
                className="input bg-gray-200 w-full"
                name="datedebut"
                value={dateDebut}
                required
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date fin :
              </label>
              <input
                type="date"
                className="input bg-gray-200 w-full"
                name="datefin"
                value={dateFin}
                required
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>
            <div className="modal-action flex justify-end">
              <button
                type="submit"
                className="button"
              >
                Confirmer
              </button>
              <button
                type="button"
                className="button bg-red-500 hover:bg-red-600 ml-2"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Fermer
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default HistoriqueSessions;
