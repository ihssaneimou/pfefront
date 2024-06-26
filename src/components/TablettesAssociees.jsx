import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useToken } from "../App";

const TablettesAssociees = () => {
  const [date, setDate] = useState("");
  const [locals, setLocals] = useState([]);
  const [demiJournee, setDemiJournee] = useState("");
  const [tabletteData, setTabletteData] = useState([]);
  const [filteredTabletteData, setFilteredTabletteData] = useState([]);
  const [local, setLocal] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useToken();
  const [selectedTablette, setSelectedTablette] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24.5;

  useEffect(() => {
    fetchTablette();
  }, [token]);

  const fetchTablette = () => {
    if (!token) {
      alert("No token found. Please log in.");
    } else {
      axios.get("http://localhost:8000/api/tablette", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setTabletteData(response.data);
          setFilteredTabletteData(response.data);
        })
        .catch(error => {
          console.error('Error fetching tablette data:', error);
        });
    }
  };

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

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

  const totalPages = Math.ceil(filteredTabletteData.length / itemsPerPage);
  const currentTabletteData = filteredTabletteData.slice(
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-800">Les appareils associés</h1>
        <div className="relative">
          <input
            type="text"
            className="input bg-gray-100 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 absolute top-1/2 left-3 transform -translate-y-1/2"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Device ID</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Code Association</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTabletteData.map((tablette) => {
              if (tablette.statut === 'associer') {
                return (
                  <tr className="border-t" key={tablette.device_id}>
                    <td className="px-4 py-2">{tablette.device_id}</td>
                    <td className="px-4 py-2">{tablette.statut}</td>
                    <td className="px-4 py-2">{tablette.code_association}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        className="p-2 rounded-md bg-red-500 text-white hover:bg-red-700 focus:outline-none"
                        onClick={() => handleDelete(tablette)}
                      >
                        Dissocier
                      </button>
                      <button
                        className="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
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
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4 mb-4">
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

      {showModal && (
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
      )}
    </div>
  );
};

export default TablettesAssociees;
