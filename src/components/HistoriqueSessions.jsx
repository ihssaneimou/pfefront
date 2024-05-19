import React, { useState } from "react";
import axios from "axios";
const HistoriqueSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [nom_session, setnom_session] = useState("");
  const [type_session, settype_session] = useState("");
  const [datedebut, setdatedebut] = useState("");
  const [datefin, setdatefin] = useState("");

  const [sessionData, setSessionData] = useState({
    nom_session: "",
    type_session: "",
    datedebut: "",
    datefin: "",
  });


  
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSessionData({ ...sessionData, [name]: value });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const newsession = {
      nom_session: nom_session,
      type_session: type_session,
      datedebut : datedebut ,
      datefin : datefin ,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/session/create", newsession);
      setSessions([...sessions, response.data]);
      alert("Session ajouté avec succès!");
      document.getElementById("my_modal_1").close();
      // Reset form fields
      setnom_session("");
      settype_session("");
      setdatedebut("");
      setdatefin("");
    } catch (error) {
      console.error("Erreur lors de l'ajout du session", error);
      alert("Erreur lors de l'ajout du session");
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Historique des sessions</h1>
        </div>
        <div>
          <label className="input bg-gray-300 input-bordered flex items-center gap-2">
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
        <div className="flex">
          <button
            className="btn mx-auto w-[60%] p-3 rounded-md bg-blue-600 text-black hover:bg-blue-700 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            Créer session
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="modal-box bg-gray-200">
                <h3 className="font-bold text-lg mb-4">Créer une session</h3>
                <select
                  className="select bg-gray-300 select-bordered w-full max-w-xs mb-4"
                  name="nom_session"
                  value={sessionData.nom_session}
                  onChange={handleChange}
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
                  value={sessionData.type_session}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Type session
                  </option>
                  <option value="Normale">Normale</option>
                  <option value="Rattrapage">Rattrapage</option>
                </select>
                <div className="mt-4 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début :</label>
                  <input
                    type="date"
                    className="input bg-gray-300 w-full max-w-xs"
                    name="datedebut"
                    value={sessionData.datedebut}
                    onChange={handleChange}
                    placeholder="Date début"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin :</label>
                  <input
                    type="date"
                    className="input bg-gray-300 w-full max-w-xs"
                    name="datefin"
                    value={sessionData.datefin}
                    onChange={handleChange}
                    placeholder="Date fin"
                  />
                </div>
                <div className="modal-action grid grid-cols-3 gap-4 items-center">
                  <button className="w-full p-3 rounded-md bg-blue-600 text-black hover:bg-blue-700 focus:outline-none" onClick={handleAdd}>
                    Confirmer
                  </button>
                  <button className="btn float-right text-black bg-red-400 border-none hover:bg-red-500" onClick={() => setIsModalOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
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
          {sessions.map((session, index) => (
            <tr key={index}>
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
