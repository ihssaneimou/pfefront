import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useToken } from "../App";

const TablettesAssociees = () => {
  const [tabletteData, setTabletteData] = useState([]);
  const [filteredTabletteData, setFilteredTabletteData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
          console.log(response.data);
          setTabletteData(response.data);
          setFilteredTabletteData(response.data.filter(tablette => tablette.statut === 'bloquer'));
        })
        .catch(error => {
          console.error('Error fetching tablette data:', error);
        });
    }
  };

  const handleReassocier = async (tablette) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tablette/edit/${tablette.id_tablette}`, {
        statut: 'associer'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTablette();
      alert('La tablette a été débloquée avec succès !');
    } catch (error) {
      console.error('Une erreur est produite lors de la réassociation de la tablette :', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredTabletteData(tabletteData.filter(tablette => tablette.statut === 'bloquer'));
    } else {
      const filtered = tabletteData.filter(tablette =>
        tablette.device_id.toLowerCase().includes(query.toLowerCase()) && tablette.statut === 'bloquer'
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
            currentPage === page ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
        <h1 className="text-4xl font-extrabold text-red-600">Les appareils bloqués</h1>
        <div className="relative">
          <input
            type="text"
            className="input bg-red-200 border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-400"
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
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTabletteData.map((tablette) => (
              <tr className="border-t" key={tablette.device_id}>
                <td className="px-4 py-2">{tablette.device_id}</td>
                <td className="px-4 py-2 ">{tablette.statut}</td>
                <td className="px-4 py-2">
                  <button
                    className="btn p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                    onClick={() => handleReassocier(tablette)}
                  >
                    Débloquer
                  </button>
                </td>
              </tr>
            ))}
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
    </div>
  );
};

export default TablettesAssociees;
