import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../App";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import './HistoriqueSessions.css'; // Assurez-vous que le chemin est correct
import PdfViewer from "./testpdf";
import { Link } from "react-router-dom";

const HistoriqueSessions = () => {
  const [pdfFile, setPdfFile] = useState('');
  const [sessions, setSessions] = useState([]);
  const [nomSession, setNomSession] = useState("");
  const [typeSession, setTypeSession] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [local, setLocal] = useState("");
  const [demiJournee, setDemiJournee] = useState("");
  const [date, setDate] = useState("");
  const [locals, setLocals] = useState([]); // New state for storing locals
  // const [selectedTablette, setSelectedTablette] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    // Fetch locals data
    const fetchLocals = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/local", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLocals(response.data);
      } catch (error) {
        console.error("Error fetching locals", error);
      }
    };

    fetchLocals();
  }, [token]);


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
              className="search-input grow bg-transparent p-2 "
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
            className="button text-base "
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
                  <Link to={`/pagePdf/${session.id_session}`}>
                    <button className="btn btn-ghost p-2 rounded-md bg-[#3182ce] text-white hover:bg-blue-700 focus:outline-none"
                    // onClick={() => {
                      //   setSelectedTablette(tablette);
                      //   setShowModal(true);
                      // }}
                      // onClick={() => getPdf(session.id_session)}
                      >
                      Consulter
                    </button>
                      </Link>
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

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="font-bold text-xl mb-4">Consulter la session</h3>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date d'examen:
              </label>
              <input
                type="date"
                className="input bg-gray-200 w-full"
                name="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

          <div className="w-full flex mb-4">
            <select
            className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs"
            value={demiJournee}
            onChange={(e) => setDemiJournee(e.target.value)}
          >
            <option disabled value="">
              Selectionner la demi-journée
            </option>
            <option>AM</option>
            <option>PM</option>
          </select>
          </div>

          <div className="w-full flex mb-4">
            <select
            className="mx-auto select select-bordered bg-gray-300 w-full max-w-xs"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          >
            <option disabled value="">
              Selectionner le local
            </option>
            {locals.map((loc) => {
              if (loc.num_local != 0) return (
                <option key={loc.id_local} value={loc.id_local}>
                  {loc.num_local}
                </option>
              )
            })}
              </select>
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
                onClick={() => document.getElementById("my_modal_2").close()}
              >
                Fermer
              </button>
            </div>


            {/* {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-800">Affecter une tablette</h3>
            <form onSubmit={handleAffectation}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selectionner le local
                </label>
                <select
                  className="bg-gray-300 select select-bordered w-full"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                >
                  <option disabled value="">
                    Selectionner le local
                  </option>
                  {locals.map((loc) => loc.num_local !== 0 && (
                    <option key={loc.id_local} value={loc.id_local}>
                      {loc.num_local}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selectionner la date
                </label>
                <input
                  type="date"
                  className="bg-gray-300 border border-gray-300 rounded-md p-2 w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selectionner la demi-journée
                </label>
                <select
                  className="bg-gray-300 select select-bordered w-full"
                  value={demiJournee}
                  onChange={(e) => setDemiJournee(e.target.value)}
                >
                  <option disabled value="">
                    Selectionner la demi-journée
                  </option>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="btn bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2"
                  onClick={() => setShowModal(false)}
                >
                  Fermer
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default HistoriqueSessions;
