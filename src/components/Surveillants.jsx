import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../App";
import './Surveillants.css'; // Assuming you want to reuse the same CSS

const Surveillants = () => {
  const [surveillants, setSurveillants] = useState([]);
  const [filteredSurveillants, setFilteredSurveillants] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [nomComplet, setNomComplet] = useState("");
  const [idDepartement, setIdDepartement] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
    fetchSurveillants();
    fetchDepartments();
  }, [token]);

  const fetchSurveillants = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/surveillant", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSurveillants(response.data);
      setFilteredSurveillants(response.data);
    } catch (error) {
      console.error("Error fetching surveillants", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/departement", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/surveillant/create",
        {
          nomComplet_s: nomComplet,
          id_departement: idDepartement,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Surveillant ajouté avec succès!");
      const newSurveillant = response.data;
      setSurveillants([...surveillants, newSurveillant]);
      setFilteredSurveillants([...surveillants, newSurveillant]);
      document.getElementById("my_modal_1").close();
      resetForm();
    } catch (error) {
      console.error("Erreur lors de l’ajout du surveillant", error);
      alert("Erreur lors de l’ajout du surveillant");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/surveillant/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updatedSurveillants = surveillants.filter((s) => s.id_surveillant !== id);
      setSurveillants(updatedSurveillants);
      setFilteredSurveillants(updatedSurveillants);
      alert("Surveillant supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression du surveillant", error);
      alert("Erreur lors de la suppression du surveillant");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredSurveillants(surveillants);
    } else {
      const filtered = surveillants.filter((surveillant) =>
        surveillant.nomComplet_s.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSurveillants(filtered);
    }
    setCurrentPage(1); // Reset to the first page after a search
  };

  const handleFetchSurveillantsByDepartment = async () => {
    if (!idDepartement) {
      alert("Veuillez sélectionner un département.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/surveillant/department/${idDepartement}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFilteredSurveillants(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des surveillants par département", error);
      alert("Erreur lors de la récupération des surveillants par département");
    }
  };

  const resetForm = () => {
    setNomComplet("");
    setIdDepartement("");
  };

  const totalPages = Math.ceil(filteredSurveillants.length / itemsPerPage);
  const currentSurveillants = filteredSurveillants.slice(
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
        <span key={index} className="mx-1 px-2 py-1 text-sm">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`mx-1 px-2 py-1 rounded text-sm ${
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center mb-4">
        <div>
          <h1 className="session-heading text-xl">Liste des surveillants</h1>
        </div>
        <div>
          <label className="input input-bordered flex bg-gray-300 items-center gap-2">
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
        <div className="flex justify-end">
          <button
            className="button text-sm"
            onClick={() => {
              document.getElementById("my_modal_1").showModal();
            }}
          >
            Ajouter Surveillant
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr className="bg-gray-200 text-gray-700 text-base">
                <th className="px-3 py-1">Nom Complet</th>
                <th className="px-3 py-1">ID departement</th>
                <th className="px-3 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentSurveillants.map((surveillant) => (
                <tr key={surveillant.id_surveillant} className="border-t">
                  <td className="px-3 py-1 text-center align-middle">{surveillant.nomComplet_s}</td>
                  <td className="px-3 py-1 text-center align-middle">{surveillant.id_departement}</td>
                  <td className="px-3 py-1 flex justify-center items-center gap-1">
                    <button
                      className="btn btn-ghost text-red-600 text-xs"
                      onClick={() => handleDelete(surveillant.id_surveillant)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-[-4] mb-4">
          <button
            className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          {renderPagination()}
          <button
            className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="font-bold text-lg mb-2">
            Ajouter un surveillant
          </h3>
          <form onSubmit={handleSubmit}>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow text-sm"
                placeholder="Nom Complet"
                value={nomComplet}
                onChange={(e) => setNomComplet(e.target.value)}
              />
            </label>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow text-sm"
                placeholder="ID departement"
                value={idDepartement}
                onChange={(e) => setIdDepartement(e.target.value)}
              />
            </label>
            <div className="modal-action flex justify-end mt-2">
              <button
                type="submit"
                className="button text-sm"
              >
                Confirmer
              </button>
              <button
                type="button"
                className="button bg-red-500 hover:bg-red-600 ml-2 text-sm"
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

export default Surveillants;
