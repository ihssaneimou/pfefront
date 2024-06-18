import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../App";
import './Etudiants.css'; // Assuming you want to reuse the same CSS

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [filteredEtudiants, setFilteredEtudiants] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [codeApogee, setCodeApogee] = useState("");
  const [CNE, setCNE] = useState("");
  const [photo, setPhoto] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [modules, setModules] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editEtudiant, setEditEtudiant] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:8000/api/etudiant", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEtudiants(response.data);
        setFilteredEtudiants(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the etudiants", error);
      });

    axios
      .get("http://localhost:8000/api/module", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setModules(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the modules", error);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/etudiant/create",
        {
          nom_etudiant: nom,
          prenom_etudiant: prenom,
          codeApogee: codeApogee,
          CNE: CNE,
          photo: photo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Étudiant ajouté avec succès!");
      const newEtudiant = response.data;
      setEtudiants([...etudiants, newEtudiant]);
      setFilteredEtudiants([...etudiants, newEtudiant]);
      document.getElementById("my_modal_1").close();
      setNom("");
      setPrenom("");
      setCodeApogee("");
      setCNE("");
      setPhoto("");
    } catch (error) {
      console.error("Erreur lors de l’ajout de l’étudiant", error);
      alert("Erreur lors de l’ajout de l’étudiant");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/etudiant/edit/${editEtudiant.codeApogee}`,
        {
          nom_etudiant: nom,
          prenom_etudiant: prenom,
          CNE: CNE,
          photo: photo,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Étudiant modifié avec succès!");
      const updatedEtudiants = etudiants.map((etudiant) =>
        etudiant.codeApogee === editEtudiant.codeApogee
          ? { ...etudiant, nom_etudiant: nom, prenom_etudiant: prenom, CNE: CNE, photo: photo }
          : etudiant
      );
      setEtudiants(updatedEtudiants);
      setFilteredEtudiants(updatedEtudiants);
      document.getElementById("my_modal_1").close();
      setNom("");
      setPrenom("");
      setCodeApogee("");
      setCNE("");
      setPhoto("");
      setEditMode(false);
      setEditEtudiant(null);
    } catch (error) {
      console.error("Erreur lors de la modification de l'étudiant", error);
      alert("Erreur lors de la modification de l'étudiant");
    }
  };

  const handleDelete = async (codeApogee) => {
    try {
      await axios.delete(`http://localhost:8000/api/etudiant/${codeApogee}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedEtudiants = etudiants.filter(
        (etudiant) => etudiant.codeApogee !== codeApogee
      );
      setEtudiants(updatedEtudiants);
      setFilteredEtudiants(updatedEtudiants);
      alert("Étudiant supprimé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant", error);
      alert("Erreur lors de la suppression de l'étudiant");
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredEtudiants(etudiants);
    } else {
      const filtered = etudiants.filter(
        (etudiant) =>
          etudiant.nom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
          etudiant.prenom_etudiant.toLowerCase().includes(query.toLowerCase()) ||
          etudiant.CNE.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEtudiants(filtered);
    }
  };

  const openEditModal = (etudiant) => {
    setEditMode(true);
    setEditEtudiant(etudiant);
    setNom(etudiant.nom_etudiant);
    setPrenom(etudiant.prenom_etudiant);
    setCodeApogee(etudiant.codeApogee);
    setCNE(etudiant.CNE);
    setPhoto(etudiant.photo);
    document.getElementById("my_modal_1").showModal();
  };

  const totalPages = Math.ceil(filteredEtudiants.length / itemsPerPage);
  const currentEtudiants = filteredEtudiants.slice(
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
        <span key={index} className="mx-1 px-2 py-1 text-xs">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`mx-1 px-2 py-1 rounded text-xs ${
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
          <h1 className="session-heading text-lg">Liste des etudiants</h1>
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
            className="button text-xs"
            onClick={() => {
              setEditMode(false);
              setNom("");
              setPrenom("");
              setCodeApogee("");
              setCNE("");
              setPhoto("");
              document.getElementById("my_modal_1").showModal();
            }}
          >
            Ajouter Etudiant
          </button>
        </div>
      </div>
      <div className="session-table-container bg-white shadow-md rounded-lg overflow-hidden max-w-full mx-auto">
        <div className="table-responsive">
          <table className="table-auto w-full table-full-width text-xs">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-2 py-1">Nom</th>
                <th className="px-2 py-1">Prenom</th>
                <th className="px-2 py-1">Code Apogee</th>
                <th className="px-2 py-1">CNE</th>
                <th className="px-2 py-1">Photo</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEtudiants.map((etudiant) => (
                <tr key={etudiant.codeApogee} className="border-t">
                  <td className="px-2 py-1 text-center align-middle">{etudiant.nom_etudiant}</td>
                  <td className="px-2 py-1 text-center align-middle">{etudiant.prenom_etudiant}</td>
                  <td className="px-2 py-1 text-center align-middle">{etudiant.codeApogee}</td>
                  <td className="px-2 py-1 text-center align-middle">{etudiant.CNE}</td>
                  <td className="px-2 py-1 text-center align-middle">
                    <div className="avatar">
                      <div className="mask mask-squircle w-8 h-8">
                        <img src={etudiant.photo} alt="Etudiant Avatar" />
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-1 flex justify-center items-center gap-1">
                    <button
                      className="btn btn-ghost text-blue-600 text-xs"
                      onClick={() => openEditModal(etudiant)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2L2.5 10.707V13.5h2.793L14 4.793 11.207 2zM15 4.5L11.5 1 10 2.5 13.5 6 15 4.5z" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-ghost text-red-600 text-xs"
                      onClick={() => handleDelete(etudiant.codeApogee)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
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
            className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          {renderPagination()}
          <button
            className="mx-1 px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white p-2 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h3 className="font-bold text-base mb-2">
            {editMode ? "Modifier un étudiant" : "Ajouter un étudiant"}
          </h3>
          <form onSubmit={editMode ? handleEdit : handleSubmit}>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow text-xs"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </label>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow text-xs"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </label>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow text-xs"
                placeholder="Code Apogee"
                value={codeApogee}
                onChange={(e) => setCodeApogee(e.target.value)}
                disabled={editMode}
              />
            </label>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2 mb-2">
              <input
                type="text"
                className="grow text-xs"
                placeholder="CNE"
                value={CNE}
                onChange={(e) => setCNE(e.target.value)}
              />
            </label>
            <label className="input bg-gray-200 input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow text-xs"
                placeholder="Photo URL"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </label>
            <div className="modal-action flex justify-end mt-2">
              <button
                type="submit"
                className="button text-xs"
              >
                Confirmer
              </button>
              <button
                type="button"
                className="button bg-red-500 hover:bg-red-600 ml-2 text-xs"
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

export default Etudiants;
