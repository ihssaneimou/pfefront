import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useToken } from "../App";

const TablettesAssociees = () => {
  const [date, setDate] = useState("");
  const [locals, setLocals] = useState([]); // New state for storing locals
  const [demiJournee, setDemiJournee] = useState("");
  const [tabletteData, setTabletteData] = useState([]);
  const [filteredTabletteData, setFilteredTabletteData] = useState([]);
  const [local, setLocal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useToken();
  const [selectedTablette, setSelectedTablette] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTablette();
  }, [token]);

  const fetchTablette = () => {
    if (!token) {
      alert("No token found. Please log in.");
    } else {
      // Fetch the initial data with token
      axios.get("http://localhost:8000/api/tablette", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log(response.data);
          setTabletteData(response.data);
          setFilteredTabletteData(response.data);
        })
        .catch(error => {
          console.error('Error fetching tablette data:', error);
        });
    }
  }

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

  const handleDelete = async (tablette) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/tablette/${tablette.id_tablette}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTablette();
      console.log(response.data);
      alert('La tablette a été dissociée avec succès !');
    } catch (error) {
      console.error('Une erreur est produite lors de la suppression de la tablette :', error);
    }
  };

  const handleAffectation = async (event) => {
    event.preventDefault();
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/affectation/create', {
        "id_tablette": selectedTablette.id_tablette,
        "date_affectation": date,
        "id_local": local,
        "demi_journee_affectation": demiJournee
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTablette();
      console.log(response.data);
      alert('La tablette a été affectée avec succès !');
      setShowModal(false);
    } catch (error) {
      console.error('Une erreur est produite lors de l\'affectation de la tablette :', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTabletteData(tabletteData);
    } else {
      const filtered = tabletteData.filter(tablette =>
        tablette.device_id.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTabletteData(filtered);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <h1 className="text-xl mb-4 mr-10">Les appareils associés</h1>
        </div>
        <div></div>
        <div>
          <label className="input bg-gray-300 input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
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
      </div>

      <table className="table lg:w-[70vw] w-full">
        <thead>
          <tr className="text-slate-700">
            <th>Device ID</th>
            <th>Statut</th>
            <th>Code Association</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTabletteData.map((tablette) => {
            if (tablette.statut === 'associer') {
              return (
                <tr className="cursor-pointer" key={tablette.device_id}>
                  <td>{tablette.device_id}</td>
                  <td>{tablette.statut}</td>
                  <td>{tablette.code_association}</td>
                  <td className="flex gap-4">
                    <button
                      className="p-3 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none"
                      onClick={() => handleDelete(tablette)}
                    >
                      Dissocier
                    </button>
                    <button
                      className="btn p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                      onClick={() => {
                        setSelectedTablette(tablette);
                        setShowModal(true);
                      }}
                    >
                      Affecter
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {showModal && (
        <dialog open className="modal">
          <div className="modal-box bg-gray-200">
            <form
              className="overflow-x-auto mb-4"
              onSubmit={handleAffectation}
            >
              <div className="w-full flex mb-4">
                <select
                  className="mx-auto bg-gray-300 select select-bordered w-full max-w-xs"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                >
                  <option disabled value="">
                    Selectionner le local
                  </option>
                  {locals.map((loc) => {
                    if (loc.num_local != 0) {
                      return (
                        <option key={loc.id_local} value={loc.id_local}>
                          {loc.num_local}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <div className="w-full flex mb-4">
                <input
                  id="dateInput"
                  type="date"
                  className="mx-auto bg-gray-300 w-full max-w-xs border border-gray-300 rounded-md p-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="w-full flex mb-4">
                <select
                  className="mx-auto bg-gray-300 select select-bordered w-full max-w-xs"
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
                  className="btn float-right text-white bg-red-400 border-none hover:bg-red-500"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default TablettesAssociees;
